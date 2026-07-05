const CLP = (n) => "$" + Number(n).toLocaleString("es-CL");
const el = (id) => document.getElementById(id);

let token = sessionStorage.getItem("barley_token") || null;
let currentFilter = "todos";
let pollTimer = null;

const ESTADOS = ["pendiente", "preparando", "listo", "entregado"];

function showDash(){
  el("loginView").classList.add("hidden");
  el("dashView").classList.remove("hidden");
  document.querySelector('.filter-btn[data-f="todos"]').classList.add("active");
  loadOrders();
  pollTimer = setInterval(loadOrders, 5000);
}

function showLogin(){
  el("dashView").classList.add("hidden");
  el("loginView").classList.remove("hidden");
  if (pollTimer) clearInterval(pollTimer);
}

el("loginBtn").addEventListener("click", async () => {
  const usuario = el("loginUser").value.trim();
  const password = el("loginPass").value;
  el("loginError").textContent = "";
  try {
    const res = await fetch("/api/manager/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({usuario, password}),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error");
    token = data.token;
    sessionStorage.setItem("barley_token", token);
    showDash();
  } catch(err){
    el("loginError").textContent = err.message;
  }
});

el("logoutBtn").addEventListener("click", async () => {
  await fetch("/api/manager/logout", { method:"POST", headers:{"x-manager-token": token} });
  sessionStorage.removeItem("barley_token");
  token = null;
  showLogin();
});

document.querySelectorAll("#filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#filters button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.f;
    renderOrders(window.__orders || []);
  });
});

async function loadOrders(){
  try{
    const res = await fetch("/api/manager/orders", { headers: {"x-manager-token": token} });
    if (res.status === 401) { showLogin(); return; }
    const orders = await res.json();
    window.__orders = orders;
    renderOrders(orders);
  } catch(err){
    console.error(err);
  }
}

function timeAgo(iso){
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "ahora";
  if (mins < 60) return `hace ${mins} min`;
  const hrs = Math.floor(mins/60);
  return `hace ${hrs} h ${mins%60} min`;
}

function renderOrders(orders){
  const grid = el("ordersGrid");
  const filtered = currentFilter === "todos" ? orders : orders.filter(o => o.estado === currentFilter);

  if (filtered.length === 0){
    grid.innerHTML = `<div class="text-center text-muted py-10" style="grid-column:1/-1;">No hay pedidos en esta categoría.</div>`;
    return;
  }

  grid.innerHTML = "";
  filtered.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card " + order.estado;
    card.innerHTML = `
      <button class="del-btn" title="Eliminar pedido">✕</button>
      <div class="flex justify-between items-start mb-2">
        <div>
          <div class="font-mono2 font-bold text-2xl text-gold">Mesa ${order.mesa}</div>
          <div class="text-[11px] text-muted">${timeAgo(order.creado)}</div>
        </div>
        <div class="badge ${order.estado}">${order.estado}</div>
      </div>
      <div class="text-[13.5px] my-2.5">
        ${order.items.map(it => `<div class="flex justify-between py-0.5"><span>${it.cantidad}× ${it.nombre}</span><span>${CLP(it.precio * it.cantidad)}</span></div>`).join("")}
      </div>
      ${order.notas ? `<div class="text-[12.5px] text-gold rounded-lg py-2 px-2.5 mb-2.5" style="background:rgba(227,165,72,.08);">📝 ${order.notas}</div>` : ""}
      <div class="font-mono2 font-bold text-right mb-3">${CLP(order.total)}</div>
      <div class="flex gap-1.5 flex-wrap step-row"></div>
    `;

    const stepRow = card.querySelector(".step-row");
    ESTADOS.forEach(estado => {
      const b = document.createElement("button");
      b.className = "step-btn" + (estado === order.estado ? " current" : "");
      b.textContent = estado;
      b.addEventListener("click", () => updateEstado(order.id, estado));
      stepRow.appendChild(b);
    });

    card.querySelector(".del-btn").addEventListener("click", () => deleteOrder(order.id));

    grid.appendChild(card);
  });
}

async function updateEstado(id, estado){
  await fetch(`/api/manager/orders/${id}`, {
    method: "PATCH",
    headers: {"Content-Type":"application/json", "x-manager-token": token},
    body: JSON.stringify({estado}),
  });
  loadOrders();
}

async function deleteOrder(id){
  if (!confirm("¿Eliminar este pedido?")) return;
  await fetch(`/api/manager/orders/${id}`, { method:"DELETE", headers:{"x-manager-token": token} });
  loadOrders();
}

if (token) showDash(); else showLogin();
