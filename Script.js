// ===== メニュー設定 =====
const drinks = [
  { name: "ビール", price: 600 },
  { name: "ハイボール", price: 500 },
  { name: "レモンサワー", price: 500 },
  { name: "焼酎", price: 500 }
];

const foods = [
  { name: "唐揚げ", price: 700 },
  { name: "ポテト", price: 500 },
  { name: "枝豆", price: 400 },
  { name: "ピザ", price: 900 }
];

let currentTable = "A";
let orders = JSON.parse(localStorage.getItem("barPOS")) || {
  A: [],
  B: [],
  C: []
};

// ===== テーブル切替 =====
function switchTable(table) {
  currentTable = table;

  document.querySelectorAll(".top-bar button").forEach(btn =>
    btn.classList.remove("active")
  );
  document.getElementById("table" + table).classList.add("active");

  renderOrders();
}

// ===== メニュー生成 =====
function renderMenus() {
  const drinkMenu = document.getElementById("drinkMenu");
  const foodMenu = document.getElementById("foodMenu");

  drinkMenu.innerHTML = "";
  foodMenu.innerHTML = "";

  drinks.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = `${item.name} ¥${item.price}`;
    btn.onclick = () => addItem(item);
    drinkMenu.appendChild(btn);
  });

  foods.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = `${item.name} ¥${item.price}`;
    btn.onclick = () => addItem(item);
    foodMenu.appendChild(btn);
  });
}

// ===== 注文追加 =====
function addItem(item) {
  const tableOrders = orders[currentTable];
  const existing = tableOrders.find(o => o.name === item.name);

  if (existing) {
    existing.quantity++;
  } else {
    tableOrders.push({
      name:
