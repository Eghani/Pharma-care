const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 25,
    image: "images/paracetamol.jpg",
  },
  {
    id: 2,
    name: "Kuffery-DX Cough Syrup",
    price: 80,
    image: "images/cough-syrup.jpg",
  },
  {
    id: 3,
    name: "Vitamin C - Pure Nutrition",
    price: 150,
    image: "images/vitamin-c.jpg",
  },
  {
    id: 4,
    name: "Cranage Skin Cream",
    price: 120,
    image: "images/skin-cream.jpg",
  },
];

function displayProducts(filteredProducts = products) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  filteredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}


displayProducts();
updateCartCount();

// --- Category Click Handler ---
document.querySelectorAll('.category').forEach(cat => {
  cat.addEventListener('click', function() {
    alert('Coming soon!');
  });
});

// --- Search Functionality ---
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
  const query = this.value.trim().toLowerCase();
  if (query === "") {
    displayProducts();
    return;
  }
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  displayProducts(filtered);
  if (filtered.length === 1 && query.length > 0) {
    // Pop up the product if exact match
    alert(`Product found: ${filtered[0].name} (₹${filtered[0].price})`);
  }
});

// --- Cart Modal Logic ---
const cartModal = document.getElementById('cartModal');
const cartItemsDiv = document.getElementById('cartItems');
const cartTotalDiv = document.getElementById('cartTotal');
const closeCartModalBtn = document.getElementById('closeCartModal');
const cartBtn = document.querySelector('.cart');

cartBtn.addEventListener('click', () => {
  renderCart();
  cartModal.classList.add('open');
});
closeCartModalBtn.addEventListener('click', () => {
  cartModal.classList.remove('open');
});
window.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.classList.remove('open');
  }
});

function renderCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsDiv.innerHTML = '';
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
    cartTotalDiv.textContent = 'Total: ₹0';
    return;
  }
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">₹${item.price}</div>
      </div>
      <button class="cart-item-remove" title="Remove" onclick="removeFromCart(${idx})">&times;</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });
  cartTotalDiv.textContent = `Total: ₹${total}`;
}

window.removeFromCart = function(idx) {
  cart.splice(idx, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
};
