const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const menu = require("./data/menu");

const app = express();
const PORT = process.env.PORT || 3000;
const ORDERS_FILE = path.join(__dirname, "data", "orders.json");

// --- Credenciales del manager (demo). En producción usar variables de entorno. ---
const MANAGER_USER = process.env.MANAGER_USER || "barley";
const MANAGER_PASS = process.env.MANAGER_PASS || "barley2026";

// Tokens de sesión en memoria (simple, suficiente para un solo bar / demo)
const sessions = new Set();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --- Utilidades de "base de datos" (archivo JSON) ---
function readOrders() {
  if (!fs.existsSync(ORDERS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function requireAuth(req, res, next) {
  const token = req.headers["x-manager-token"];
  if (token && sessions.has(token)) return next();
  return res.status(401).json({ error: "No autorizado" });
}

// --- API pública: menú ---
app.get("/api/menu", (req, res) => {
  res.json(menu);
});

// --- API pública: crear pedido ---
app.post("/api/orders", (req, res) => {
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

  const orders = readOrders();
  orders.push(nuevoPedido);
  writeOrders(orders);

  res.status(201).json(nuevoPedido);
});

// --- API pública: ver estado de los pedidos de una mesa (para que el cliente vea su progreso) ---
app.get("/api/orders/mesa/:mesa", (req, res) => {
  const orders = readOrders().filter((o) => o.mesa === Number(req.params.mesa));
  res.json(orders);
});

// --- Login del manager ---
app.post("/api/manager/login", (req, res) => {
  const { usuario, password } = req.body;
  if (usuario === MANAGER_USER && password === MANAGER_PASS) {
    const token = crypto.randomBytes(24).toString("hex");
    sessions.add(token);
    return res.json({ token });
  }
  res.status(401).json({ error: "Usuario o contraseña incorrectos." });
});

app.post("/api/manager/logout", requireAuth, (req, res) => {
  sessions.delete(req.headers["x-manager-token"]);
  res.json({ ok: true });
});

// --- API protegida: ver todos los pedidos ---
app.get("/api/manager/orders", requireAuth, (req, res) => {
  const orders = readOrders().sort((a, b) => new Date(b.creado) - new Date(a.creado));
  res.json(orders);
});

// --- API protegida: actualizar estado de un pedido ---
app.patch("/api/manager/orders/:id", requireAuth, (req, res) => {
  const { estado } = req.body;
  const validos = ["pendiente", "preparando", "listo", "entregado"];
  if (!validos.includes(estado)) {
    return res.status(400).json({ error: "Estado inválido." });
  }
  const orders = readOrders();
  const idx = orders.findIndex((o) => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Pedido no encontrado." });
  orders[idx].estado = estado;
  writeOrders(orders);
  res.json(orders[idx]);
});

// --- API protegida: borrar un pedido (ej. cancelado) ---
app.delete("/api/manager/orders/:id", requireAuth, (req, res) => {
  const orders = readOrders().filter((o) => o.id !== req.params.id);
  writeOrders(orders);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Barley Bar corriendo en http://localhost:${PORT}`);
  console.log(`Panel manager: http://localhost:${PORT}/manager.html`);
});
