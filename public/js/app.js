const CLP = (n) => "$" + Number(n).toLocaleString("es-CL");

let MENU = [];
let cart = []; // { itemId, nombre, variante, precio, cantidad }
let mesa = localStorage.getItem("barley_mesa") || null;

const el = (id) => document.getElementById(id);
const overlay = el("overlay");
const cartSheet = el("cartSheet");
const mesaSheet = el("mesaSheet");

function openSheet(sheet){
  overlay.classList.remove("hidden");
  sheet.classList.remove("translate-y-full");
  sheet.classList.add("translate-y-0");
}
function closeSheets(){
  overlay.classList.add("hidden");
  [cartSheet, mesaSheet].forEach(s => { s.classList.add("translate-y-full"); s.classList.remove("translate-y-0"); });
}
overlay.addEventListener("click", closeSheets);

function showToast(msg){
  const t = el("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  t.classList.add("animate-toastin");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=> t.classList.add("hidden"), 3200);
}

// ---------- MESA ----------
function setMesa(n){
  mesa = n;
  localStorage.setItem("barley_mesa", n);
  el("mesaNum").textContent = n;
  el("cartMesa").textContent = n;
}

el("capBtn").addEventListener("click", () => {
  el("mesaInput").value = mesa || "";
  openSheet(mesaSheet);
});

el("mesaConfirm").addEventListener("click", () => {
  const v = parseInt(el("mesaInput").value, 10);
  if (!v || v < 1 || v > 50) { showToast("Ingresa un número de mesa entre 1 y 50"); return; }
  setMesa(v);
  closeSheets();
});

// ---------- RENDER MENU ----------
const CATBTN_BASE = "flex-shrink-0 bg-barsurface border border-barline text-muted py-2 px-4 rounded-full font-semibold text-[13.5px] tracking-wide cursor-pointer whitespace-nowrap";
const CATBTN_ACTIVE = "bg-gold text-barbg border-gold";

function renderMenu(){
  const nav = el("catnav");
  const root = el("menuRoot");
  nav.innerHTML = "";
  root.innerHTML = "";

  MENU.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.className = CATBTN_BASE + (i === 0 ? " " + CATBTN_ACTIVE : "");
    btn.textContent = cat.nombre;
    btn.addEventListener("click", () => {
      document.querySelectorAll("#catnav button").forEach(b => { b.className = CATBTN_BASE; });
      btn.className = CATBTN_BASE + " " + CATBTN_ACTIVE;
      document.getElementById("cat-"+cat.id).scrollIntoView({behavior:"smooth", block:"start"});
    });
    nav.appendChild(btn);

    const section = document.createElement("section");
    section.className = "mb-8 scroll-mt-32";
    section.id = "cat-"+cat.id;
    section.innerHTML = `
      <h2 class="font-display text-xl text-gold uppercase tracking-wide mb-0.5">${cat.nombre}</h2>
      ${cat.descripcion ? `<p class="text-[13px] text-muted mb-3.5">${cat.descripcion}</p>` : ""}
    `;
    cat.items.forEach(item => section.appendChild(renderItem(item)));
    root.appendChild(section);
  });
}

function renderItem(item){
  const card = document.createElement("div");
  card.className = "bg-barsurface border border-barline rounded-xl2 py-3.5 px-4 mb-2.5";

  let selectedVariant = null;
  if (item.precios) selectedVariant = Object.keys(item.precios)[0];

  card.innerHTML = `
    <div class="flex justify-between gap-2.5 items-start">
      <div class="font-bold text-[15.5px]">${item.nombre}</div>
      <div class="font-mono2 text-gold font-bold whitespace-nowrap text-sm" data-price>${item.precio !== undefined ? CLP(item.precio) : CLP(item.precios[selectedVariant])}</div>
    </div>
    ${item.desc ? `<div class="text-[12.5px] text-muted mt-1 mb-2.5 leading-snug">${item.desc}</div>` : ""}
    ${item.precios ? `<div class="flex gap-2 flex-wrap mb-2.5" data-variants></div>` : ""}
    <div class="flex justify-end"><button class="bg-brick text-cream border-0 py-2 px-4 rounded-lg font-bold text-[13px] cursor-pointer" data-add>Agregar</button></div>
  `;

  if (item.precios) {
    const variantsWrap = card.querySelector("[data-variants]");
    const CHIP_BASE = "border border-barline bg-barsurface2 text-cream rounded-lg py-1.5 px-2.5 text-xs cursor-pointer font-mono2";
    const CHIP_SEL = "border-gold text-gold";
    Object.entries(item.precios).forEach(([label, price], idx) => {
      const chip = document.createElement("button");
      chip.className = CHIP_BASE + (idx === 0 ? " " + CHIP_SEL : "");
      chip.textContent = `${label} · ${CLP(price)}`;
      chip.addEventListener("click", () => {
        variantsWrap.querySelectorAll("button").forEach(c => { c.className = CHIP_BASE; });
        chip.className = CHIP_BASE + " " + CHIP_SEL;
        selectedVariant = label;
        card.querySelector("[data-price]").textContent = CLP(price);
      });
      variantsWrap.appendChild(chip);
    });
  }

  card.querySelector("[data-add]").addEventListener("click", () => {
    const precio = item.precios ? item.precios[selectedVariant] : item.precio;
    addToCart({ itemId: item.id, nombre: item.nombre, variante: selectedVariant, precio });
    showToast(`${item.nombre}${selectedVariant ? " ("+selectedVariant+")" : ""} agregado`);
  });

  return card;
}

// ---------- CART ----------
function addToCart({itemId, nombre, variante, precio}){
  const existing = cart.find(l => l.itemId === itemId && l.variante === variante);
  if (existing) existing.cantidad += 1;
  else cart.push({itemId, nombre, variante, precio, cantidad: 1});
  renderCartFab();
}

function cartTotal(){ return cart.reduce((s,l)=> s + l.precio * l.cantidad, 0); }
function cartCount(){ return cart.reduce((s,l)=> s + l.cantidad, 0); }

function renderCartFab(){
  const fab = el("cartFab");
  if (cart.length === 0){ fab.classList.add("hidden"); fab.classList.remove("flex"); return; }
  fab.classList.remove("hidden"); fab.classList.add("flex");
  el("cartCount").textContent = cartCount();
  el("cartTotal").textContent = CLP(cartTotal());
}

function renderCartSheet(){
  el("cartMesa").textContent = mesa || "-";
  const wrap = el("cartLines");
  wrap.innerHTML = "";
  if (cart.length === 0){
    wrap.innerHTML = `<div class="text-center text-muted py-8 text-sm">Tu pedido está vacío. Agrega algo del menú 🍽️</div>`;
  }
  cart.forEach((line, idx) => {
    const row = document.createElement("div");
    row.className = "flex justify-between items-center gap-2.5 py-2.5 border-b border-barline";
    row.innerHTML = `
      <div>
        <div class="font-semibold text-sm">${line.nombre}${line.variante ? " · "+line.variante : ""}</div>
        <div class="text-[11.5px] text-muted">${CLP(line.precio)} c/u</div>
      </div>
      <div class="flex items-center gap-2">
        <button data-act="dec" class="w-6.5 h-6.5 rounded-md border border-barline bg-barsurface2 text-cream font-bold cursor-pointer">−</button>
        <span class="font-mono2 min-w-[16px] text-center">${line.cantidad}</span>
        <button data-act="inc" class="w-6.5 h-6.5 rounded-md border border-barline bg-barsurface2 text-cream font-bold cursor-pointer">+</button>
      </div>
    `;
    row.querySelector('[data-act="inc"]').addEventListener("click", () => { line.cantidad++; renderCartSheet(); renderCartFab(); });
    row.querySelector('[data-act="dec"]').addEventListener("click", () => {
      line.cantidad--;
      if (line.cantidad <= 0) cart.splice(idx,1);
      renderCartSheet(); renderCartFab();
    });
    wrap.appendChild(row);
  });
  el("cartTotalBig").textContent = CLP(cartTotal());
}

el("cartFab").addEventListener("click", () => { renderCartSheet(); openSheet(cartSheet); });
el("closeCart").addEventListener("click", closeSheets);

el("sendOrder").addEventListener("click", async () => {
  if (!mesa) { closeSheets(); openSheet(mesaSheet); showToast("Primero indica tu número de mesa"); return; }
  if (cart.length === 0) { showToast("Agrega al menos un producto"); return; }

  const payload = {
    mesa,
    items: cart.map(l => ({ nombre: l.nombre + (l.variante ? ` (${l.variante})` : ""), precio: l.precio, cantidad: l.cantidad })),
    notas: el("notas").value.trim(),
  };

  const btn = el("sendOrder");
  btn.disabled = true;
  btn.textContent = "Enviando...";

  try{
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error((await res.json()).error || "Error al enviar");
    cart = [];
    el("notas").value = "";
    renderCartFab();
    closeSheets();
    showToast(`✅ Pedido enviado a mesa ${mesa}. ¡Ya llega a la barra!`);
  } catch(err){
    showToast("No se pudo enviar el pedido: " + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "Enviar pedido a la mesa";
  }
});

// ---------- INIT ----------
async function init(){
  const res = await fetch("/api/menu");
  MENU = await res.json();
  renderMenu();

  if (mesa) { el("mesaNum").textContent = mesa; el("cartMesa").textContent = mesa; }
  else { openSheet(mesaSheet); }
}
init();
