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


// used gpt to ensure the smooth function in the website
function displayProducts() {
  const grid = document.getElementById("productGrid");
  products.forEach((product) => {
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
