const cartCount = document.querySelector(".cart-count");
const cartButton = document.querySelector(".cart-button");
const toast = document.querySelector(".toast");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
let itemCount = 0;
let toastTimeout;

document.querySelector("#copyright-year").textContent = String(new Date().getFullYear());

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    itemCount += 1;
    cartCount.textContent = String(itemCount);
    cartButton.setAttribute("aria-label", `購物車，共 ${itemCount} 件商品`);
    showToast("已加入購物車，讓毛孩期待一下 ♡");
  });
});

document.querySelectorAll(".favorite-button").forEach((button) => {
  button.addEventListener("click", () => {
    const isFavorite = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(isFavorite));
    button.textContent = isFavorite ? "♥" : "♡";
    showToast(isFavorite ? "已加入你的收藏 ♡" : "已從收藏中移除");
  });
});

const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");

function filterProducts(category) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === category;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  productCards.forEach((card) => {
    card.hidden = category !== "all" && card.dataset.category !== category;
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => filterProducts(button.dataset.filter));
});

document.querySelectorAll("[data-filter-link]").forEach((link) => {
  link.addEventListener("click", () => filterProducts(link.dataset.filterLink));
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "關閉選單" : "開啟選單");
  mainNav.classList.toggle("is-open", isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "開啟選單");
  });
});

document.querySelector(".newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#email");
  document.querySelector(".newsletter-message").textContent =
    `謝謝訂閱！我們會將毛孩生活靈感寄到 ${email.value}。`;
  email.value = "";
});
