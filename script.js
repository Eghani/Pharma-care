// Product data with badges and categories
const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 25,
    image: "images/paracetamol.jpg",
    badge: "Popular",
    category: "pain-relief",
  },
  {
    id: 2,
    name: "Kuffery-DX Cough Syrup",
    price: 80,
    image: "images/cough-syrup.jpg",
    badge: "New",
    category: "otc",
  },
  {
    id: 3,
    name: "Vitamin C - Pure Nutrition",
    price: 150,
    image: "images/vitamin-c.jpg",
    badge: "Sale",
    category: "vitamins",
  },
  {
    id: 4,
    name: "Cranage Skin Cream",
    price: 120,
    image: "images/skin-cream.jpg",
    badge: null,
    category: "skincare",
  },
  {
    id: 5,
    name: "Omega-3 Fish Oil",
    price: 299,
    image: "images/vitamin-c.jpg",
    badge: "Popular",
    category: "vitamins",
  },
  {
    id: 6,
    name: "Ibuprofen 400mg",
    price: 35,
    image: "images/paracetamol.jpg",
    badge: null,
    category: "pain-relief",
  },
  {
    id: 7,
    name: "Antiseptic Cream",
    price: 65,
    image: "images/skin-cream.jpg",
    badge: null,
    category: "first-aid",
  },
  {
    id: 8,
    name: "Multivitamin Tablets",
    price: 199,
    image: "images/vitamin-c.jpg",
    badge: "New",
    category: "vitamins",
  },
  {
    id: 9,
    name: "Cough Drops",
    price: 45,
    image: "images/cough-syrup.jpg",
    badge: null,
    category: "otc",
  },
  {
    id: 10,
    name: "Bandage Roll",
    price: 30,
    image: "images/paracetamol.jpg",
    badge: null,
    category: "first-aid",
  },
  {
    id: 11,
    name: "Sunscreen SPF 50+",
    price: 350,
    image: "images/skin-cream.jpg",
    badge: "Popular",
    category: "skincare",
  },
  {
    id: 12,
    name: "Pain Relief Gel",
    price: 75,
    image: "images/skin-cream.jpg",
    badge: "Sale",
    category: "pain-relief",
  },
  {
    id: 13,
    name: "Vitamin D3 Capsules",
    price: 180,
    image: "images/vitamin-c.jpg",
    badge: null,
    category: "vitamins",
  },
  {
    id: 14,
    name: "Antiseptic Liquid",
    price: 95,
    image: "images/cough-syrup.jpg",
    badge: null,
    category: "first-aid",
  },
  {
    id: 15,
    name: "Hand Sanitizer 500ml",
    price: 120,
    image: "images/cough-syrup.jpg",
    badge: "New",
    category: "first-aid",
  },
  {
    id: 16,
    name: "Moisturizing Lotion",
    price: 145,
    image: "images/skin-cream.jpg",
    badge: null,
    category: "skincare",
  },
];

let currentCategory = "all";
let currentSort = "default";

// ========================================
// TOAST NOTIFICATION SYSTEM
// ========================================
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ========================================
// LOADING SKELETON
// ========================================
function showLoadingSkeleton() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "product-card skeleton";
    skeleton.innerHTML = `
      <div class="skeleton-img"></div>
      <div class="skeleton-text skeleton-title"></div>
      <div class="skeleton-text skeleton-price"></div>
      <div class="skeleton-btn"></div>
    `;
    grid.appendChild(skeleton);
  }
}

// ========================================
// PRODUCT DISPLAY WITH BADGES & FILTERING
// ========================================
function displayProducts(filteredProducts = null) {
  const grid = document.getElementById("productGrid");

  // Show loading skeleton
  showLoadingSkeleton();

  // Get products to display
  let productsToShow = filteredProducts || getFilteredAndSortedProducts();

  // Simulate loading delay
  setTimeout(() => {
    grid.innerHTML = "";

    if (productsToShow.length === 0) {
      grid.innerHTML =
        '<div class="no-products"><i class="bi bi-inbox"></i><p>No products found</p></div>';
      return;
    }

    productsToShow.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.setAttribute("data-aos", "fade-up");

      const badgeHTML = product.badge
        ? `<span class="product-badge badge-${product.badge.toLowerCase()}"><i class="bi bi-star-fill me-1"></i>${
            product.badge
          }</span>`
        : "";

      card.innerHTML = `
        ${badgeHTML}
        <img src="${product.image}" alt="${product.name}" class="product-img" />
        <h3>${product.name}</h3>
        <p><i class="bi bi-currency-rupee"></i>${product.price}</p>
        <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
          <i class="bi bi-cart-plus me-2"></i>Add to Cart
        </button>
      `;
      grid.appendChild(card);
    });

    // Reinitialize animations
    setTimeout(observeElements, 100);
  }, 500);
}

// Filter and sort products
function getFilteredAndSortedProducts() {
  let filtered = products;

  // Filter by category
  if (currentCategory !== "all") {
    filtered = products.filter((p) => p.category === currentCategory);
  }

  // Sort products
  let sorted = [...filtered];
  switch (currentSort) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // Keep original order
      break;
  }

  return sorted;
}

// ========================================
// CART MANAGEMENT WITH QUANTITY
// ========================================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Convert old cart format to new format with quantities
cart = cart.map((item) => {
  if (!item.quantity) {
    return { ...item, quantity: 1 };
  }
  return item;
});

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
    showToast(`${product.name} quantity increased!`, "success");
  } else {
    cart.push({ ...product, quantity: 1 });
    showToast(`${product.name} added to cart!`, "success");
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  // If cart modal is open, update it
  if (document.getElementById("cartModal").classList.contains("open")) {
    renderCart();
  }
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerText = totalItems;
}

function increaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
    showToast("Quantity increased", "info");
  }
}

function decreaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
    showToast("Quantity decreased", "info");
  } else if (item && item.quantity === 1) {
    removeFromCart(productId);
  }
}

window.removeFromCart = function (productId) {
  const item = cart.find((item) => item.id === productId);
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
  showToast(`${item.name} removed from cart`, "error");
};

window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;

// ========================================
// CART RENDERING
// ========================================
function renderCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsDiv = document.getElementById("cartItems");
  const cartTotalDiv = document.getElementById("cartTotal");
  const clearCartBtn = document.getElementById("clearCartBtn");

  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML =
      '<div class="cart-empty">Your cart is empty.</div>';
    cartTotalDiv.textContent = "Total: ₹0";
    clearCartBtn.style.display = "none";
    return;
  }

  clearCartBtn.style.display = "block";

  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">₹${item.price} × ${item.quantity}</div>
      </div>
      <div class="cart-item-controls">
        <div class="quantity-controls">
          <button class="qty-btn" onclick="decreaseQuantity(${item.id})">−</button>
          <span class="qty-display">${item.quantity}</span>
          <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
        </div>
        <button class="cart-item-remove" title="Remove" onclick="removeFromCart(${item.id})">&times;</button>
      </div>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  cartTotalDiv.textContent = `Total: ₹${total}`;
}

// ========================================
// INITIALIZATION
// ========================================
displayProducts();
updateCartCount();

// ========================================
// DARK MODE TOGGLE
// ========================================
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check for saved dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
  updateDarkModeIcon();
}

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    showToast("Dark mode enabled", "info");
  } else {
    localStorage.setItem("darkMode", "disabled");
    showToast("Light mode enabled", "info");
  }

  updateDarkModeIcon();
});

function updateDarkModeIcon() {
  const isDark = body.classList.contains("dark-mode");
  darkModeToggle.innerHTML = isDark
    ? '<i class="bi bi-sun-fill"></i>'
    : '<i class="bi bi-moon-fill"></i>';
}

// ========================================
// MOBILE HAMBURGER MENU
// ========================================
const hamburger = document.getElementById("hamburger");
const navlinks = document.querySelector(".navlinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navlinks.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navlinks.contains(e.target)) {
    hamburger.classList.remove("active");
    navlinks.classList.remove("active");
  }
});

// ========================================
// CATEGORY & SORT FILTERING
// ========================================
document.querySelectorAll(".category").forEach((cat) => {
  cat.addEventListener("click", function () {
    const category = this.getAttribute("data-category");
    currentCategory = category;

    // Update active state
    document
      .querySelectorAll(".category")
      .forEach((c) => c.classList.remove("active"));
    this.classList.add("active");

    displayProducts();
    showToast(
      `Showing ${
        category === "all" ? "all products" : category.replace("-", " ")
      }`,
      "info"
    );
  });
});

// Sort dropdown
const sortSelect = document.getElementById("sortSelect");
if (sortSelect) {
  sortSelect.addEventListener("change", function () {
    currentSort = this.value;
    displayProducts();
    showToast("Products sorted", "info");
  });
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();
  if (query === "") {
    displayProducts();
    return;
  }
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );
  displayProducts(filtered);

  if (filtered.length === 0) {
    showToast("No products found", "error");
  }
});

// ========================================
// CART MODAL LOGIC
// ========================================
const cartModal = document.getElementById("cartModal");
const cartItemsDiv = document.getElementById("cartItems");
const cartTotalDiv = document.getElementById("cartTotal");
const closeCartModalBtn = document.getElementById("closeCartModal");
const cartBtn = document.querySelector(".cart");
const checkoutBtn = document.getElementById("checkoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");

cartBtn.addEventListener("click", () => {
  renderCart();
  cartModal.classList.add("open");
});

closeCartModalBtn.addEventListener("click", () => {
  cartModal.classList.remove("open");
});

window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.classList.remove("open");
  }
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty!", "error");
    return;
  }
  showToast("Proceeding to checkout...", "success");
  // Add checkout logic here
  setTimeout(() => {
    showToast("Checkout feature coming soon!", "info");
  }, 1000);
});

clearCartBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all items from your cart?")) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
    showToast("Cart cleared", "info");
  }
});

// ========================================
// NEWSLETTER MODAL
// ========================================
const newsletterModal = document.getElementById("newsletterModal");
const newsletterBtn = document.getElementById("newsletterBtn");
const closeNewsletterModal = document.getElementById("closeNewsletterModal");
const newsletterForm = document.getElementById("newsletterForm");

newsletterBtn.addEventListener("click", () => {
  newsletterModal.classList.add("open");
});

closeNewsletterModal.addEventListener("click", () => {
  newsletterModal.classList.remove("open");
});

window.addEventListener("click", (e) => {
  if (e.target === newsletterModal) {
    newsletterModal.classList.remove("open");
  }
});

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector('input[type="email"]').value;
  showToast(`Thank you for subscribing with ${email}!`, "success");
  newsletterForm.reset();
  newsletterModal.classList.remove("open");
});

// ========================================
// SCROLL ANIMATIONS (AOS - Animate On Scroll)
// ========================================
function observeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll("[data-aos]").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });
}

// Initialize animations after products load
setTimeout(observeElements, 600);
