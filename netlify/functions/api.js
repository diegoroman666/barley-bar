const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { getStore, connectLambda } = require("@netlify/blobs");

const menu = require("../../data/menu");

const app = express();
const router = express.Router();

// --- Credenciales del manager (demo). En producción usar variables de entorno. ---
const MANAGER_USER = process.env.MANAGER_USER || "barley";
const MANAGER_PASS = process.env.MANAGER_PASS || "barley2026";
const SESSION_SECRET = process.env.SESSION_SECRET || "barley-session-secret-dev";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 horas

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  if (Buffer.isBuffer(req.body)) {
    const raw = req.body.toString("utf-8");
    try {
      req.body = raw ? JSON.parse(raw) : {};
    } catch {
      req.body = {};
    }
  }
  next();
});

// --- Netlify Blobs: pedidos ---
// Cada pedido se guarda en su propia clave (id) para evitar condiciones de
// carrera al leer-modificar-escribir un único arreglo bajo consistencia eventual.
const ordersStore = () => getStore("barley-orders");

async function listOrders() {
  const { blobs } = await ordersStore().list();
  const orders = await Promise.all(blobs.map(({ key }) => ordersStore().get(key, { type: "json" })));
  return orders.filter(Boolean);
}

async function getOrder(id) {
  return ordersStore().get(id, { type: "json" });
}

async function saveOrder(order) {
  await ordersStore().setJSON(order.id, order);
}

async function deleteOrderById(id) {
  await ordersStore().delete(id);
}

// --- Sesiones de manager: tokens firmados sin estado (evita depender de la
// consistencia de Blobs justo después del login) ---
function signSession(expiresAt) {
  const payload = Buffer.from(String(expiresAt)).toString("base64url");
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

function verifySession(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return false;
  }
  const expiresAt = Number(Buffer.from(payload, "base64url").toString("utf-8"));
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

function requireAuth(req, res, next) {
  const token = req.headers["x-manager-token"];
  if (verifySession(token)) return next();
  return res.status(401).json({ error: "No autorizado" });
}

// --- API pública: menú ---
router.get("/menu", (req, res) => {
  res.json(menu);
});

// --- API pública: crear pedido ---
router.post("/orders", async (req, res) => {
  const { mesa, items, notas, cliente } = req.body;

  const mesaNum = Number(mesa);
  if (!mesaNum || mesaNum < 1 || mesaNum > 50) {
    return res.status(400).json({ error: "Número de mesa inválido (1-50)." });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "El pedido no tiene ítems." });
  }

  const total = items.reduce((sum, it) => sum + (Number(it.precio) || 0) * (Number(it.cantidad) || 1), 0);

  const nuevoPedido = {
    id: crypto.randomUUID(),
    mesa: mesaNum,
    cliente: cliente || null,
    items,
    notas: notas || "",
    total,
    estado: "pendiente", // pendiente -> preparando -> listo -> entregado
    creado: new Date().toISOString(),
  };

  await saveOrder(nuevoPedido);

  res.status(201).json(nuevoPedido);
});

// --- API pública: ver estado de los pedidos de una mesa ---
router.get("/orders/mesa/:mesa", async (req, res) => {
  const orders = (await listOrders()).filter((o) => o.mesa === Number(req.params.mesa));
  res.json(orders);
});

// --- Login del manager ---
router.post("/manager/login", (req, res) => {
  const { usuario, password } = req.body;
  if (usuario === MANAGER_USER && password === MANAGER_PASS) {
    const token = signSession(Date.now() + SESSION_TTL_MS);
    return res.json({ token });
  }
  res.status(401).json({ error: "Usuario o contraseña incorrectos." });
});

router.post("/manager/logout", requireAuth, (req, res) => {
  res.json({ ok: true });
});

// --- API protegida: ver todos los pedidos ---
router.get("/manager/orders", requireAuth, async (req, res) => {
  const orders = (await listOrders()).sort((a, b) => new Date(b.creado) - new Date(a.creado));
  res.json(orders);
});

// --- API protegida: actualizar estado de un pedido ---
router.patch("/manager/orders/:id", requireAuth, async (req, res) => {
  const { estado } = req.body;
  const validos = ["pendiente", "preparando", "listo", "entregado"];
  if (!validos.includes(estado)) {
    return res.status(400).json({ error: "Estado inválido." });
  }
  const order = await getOrder(req.params.id);
  if (!order) return res.status(404).json({ error: "Pedido no encontrado." });
  order.estado = estado;
  await saveOrder(order);
  res.json(order);
});

// --- API protegida: borrar un pedido ---
router.delete("/manager/orders/:id", requireAuth, async (req, res) => {
  await deleteOrderById(req.params.id);
  res.json({ ok: true });
});

app.use("/api", router);
app.use("/.netlify/functions/api", router);

const serverlessHandler = serverless(app);

module.exports.handler = (event, context) => {
  connectLambda(event);
  return serverlessHandler(event, context);
};
