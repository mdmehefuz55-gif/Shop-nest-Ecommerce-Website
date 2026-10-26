// ============================================================
// Shop Nest - Main JavaScript
// Simple cart using localStorage and basic page interactions
// ============================================================

// Key used to store cart data in localStorage
const CART_KEY = "shopnest_cart";

// Simple product list used on the Products and Home pages
// In a real project this data would usually come from a backend API.
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 49.99,
    image: "https://th.bing.com/th/id/R.486b7c23e381dd57c2fe219ec881cf95?rik=YQWBlkKvsgRASA&riu=http%3a%2f%2fwww.bhphotovideo.com%2fimages%2fimages2500x2500%2fbeats_by_dr_dre_900_00198_01_studio_wireless_headphones_matte_1016367.jpg&ehk=jy4Ciak0lwr2C%2b%2fPoOyghunDvLftN6AbzeYem2b4aIc%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 79.99,
    image: "https://cdn.vectorstock.com/i/500p/63/70/smart-watch-and-wifi-vector-9296370.jpg",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 39.99,
    image: "https://vsonic.ng/wp-content/uploads/2024/11/1-150.jpg",
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 29.99,
    image: "https://m.media-amazon.com/images/I/71iJm0nfX3L._AC_SL1500_.jpg",
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: 24.99,
    image: "https://tse1.mm.bing.net/th/id/OIP.OROc6OGlOvuXemziSfJFTwHaHa?w=2000&h=2000&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    price: 89.99,
    image: "https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b456f348-4467-4aea-a658-6c6de8b2f3d5/mechanical-keyboards-wasd-code.jpg",
  },
];

// ------------------------------------------------------------
// Helper functions for working with localStorage
// ------------------------------------------------------------

/**
 * Read the cart from localStorage.
 * Returns an array of items (each item has id, name, price, quantity).
 */
function getCartFromStorage() {
  const raw = window.localStorage.getItem(CART_KEY);
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Could not parse cart data, resetting cart.", error);
    return [];
  }
}

/**
 * Save the cart array back to localStorage.
 * @param {Array} cart
 */
function saveCartToStorage(cart) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// ------------------------------------------------------------
// Cart logic
// ------------------------------------------------------------

/**
 * Add a product to the cart.
 * If the product is already there, just increase its quantity.
 * This function is called from the Products / Home pages.
 */
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return;
  }

  const cart = getCartFromStorage();
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  saveCartToStorage(cart);
  window.alert(`${product.name} has been added to your cart.`);
}

/**
 * Remove a product completely from the cart by its id.
 * After updating, the cart view is refreshed.
 */
function removeFromCart(productId) {
  const cart = getCartFromStorage();
  const updatedCart = cart.filter((item) => item.id !== productId);
  saveCartToStorage(updatedCart);
  displayCart();
}

/**
 * Display the cart items on the Cart page.
 * This function is only meaningful on cart.html.
 */
function displayCart() {
  const itemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("cart-total-price");
  const emptyMessage = document.getElementById("cart-empty-message");

  if (!itemsContainer || !totalPriceElement || !emptyMessage) {
    // If any of these elements do not exist, we are not on the cart page.
    return;
  }

  const cart = getCartFromStorage();

  // Clear previous content
  itemsContainer.innerHTML = "";

  if (cart.length === 0) {
    emptyMessage.style.display = "block";
    totalPriceElement.textContent = "$0.00";
    return;
  }

  emptyMessage.style.display = "none";

  let total = 0;

  // Build a small card for each cart item
  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";

    const info = document.createElement("div");
    info.className = "cart-item-info";

    const name = document.createElement("div");
    name.className = "cart-item-name";
    name.textContent = item.name;

    const meta = document.createElement("div");
    meta.className = "cart-item-meta";
    meta.textContent = `Quantity: ${item.quantity} × $${item.price.toFixed(
      2
    )}`;

    info.appendChild(name);
    info.appendChild(meta);

    const actions = document.createElement("div");

    const subtotal = item.price * item.quantity;
    total += subtotal;

    const subtotalText = document.createElement("div");
    subtotalText.className = "cart-item-meta";
    subtotalText.textContent = `$${subtotal.toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.className = "btn";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeFromCart(item.id));

    actions.appendChild(subtotalText);
    actions.appendChild(removeButton);

    itemElement.appendChild(info);
    itemElement.appendChild(actions);
    itemsContainer.appendChild(itemElement);
  });

  totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// ------------------------------------------------------------
// Page-specific rendering and event handlers
// ------------------------------------------------------------

/**
 * Render products into a container.
 * Used on the Home (featured products) and Products pages.
 */
function renderProducts(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  const list = typeof limit === "number" ? products.slice(0, limit) : products;

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "product-image-wrapper";
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    imageWrapper.appendChild(image);

    const body = document.createElement("div");
    body.className = "product-body";

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = `$${product.price.toFixed(2)}`;

    const actions = document.createElement("div");
    actions.className = "product-actions";

    const button = document.createElement("button");
    button.className = "btn primary-btn";
    button.textContent = "Add to Cart";
    button.addEventListener("click", () => addToCart(product.id));

    actions.appendChild(button);

    body.appendChild(name);
    body.appendChild(price);
    body.appendChild(actions);

    card.appendChild(imageWrapper);
    card.appendChild(body);
    container.appendChild(card);
  });
}

/**
 * Attach behaviour to the login form.
 * This only runs on the login page.
 */
function setupLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) {
    return;
  }

  const messageElement = document.getElementById("login-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      messageElement.textContent = "Please enter both username and password.";
      return;
    }

    // In this simple demo we do not talk to a server.
    messageElement.textContent =
      "Login successful (demo only, no real account created).";
  });
}

/**
 * Attach behaviour to the contact form.
 * This only runs on the contact page.
 */
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) {
    return;
  }

  const statusElement = document.getElementById("contact-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
      statusElement.textContent = "Please fill in all fields before sending.";
      return;
    }

    statusElement.textContent =
      "Thank you for contacting us! (This is a demo, so no real email is sent.)";
    form.reset();
  });
}

/**
 * Set the current year in the footer.
 * This keeps the site looking up-to-date.
 */
function setCurrentYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

// ------------------------------------------------------------
// Initialize page when DOM is ready
// ------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();

  // data-page is set in the <body> tag of each HTML file
  const page = document.body.dataset.page;

  if (page === "home") {
    // Show a smaller selection of products on the home page
    renderProducts("featured-products", 3);
  } else if (page === "products") {
    renderProducts("products-list");
  } else if (page === "cart") {
    displayCart();
  } else if (page === "login") {
    setupLoginForm();
  } else if (page === "contact") {
    setupContactForm();
  }
});

// Expose functions globally so they can be called from HTML if needed.
// (For this project we only use them from JavaScript, but this is helpful
// for beginners to see how they could be used.)
window.addToCart = addToCart;
window.displayCart = displayCart;
window.removeFromCart = removeFromCart;

