const button = document.getElementById("btn-lang");
const dropdown = document.getElementById("hl-dropdown-content");

const searchBarRes = document.getElementById("search-bar-results");
const userInputField = document.getElementById("user-input");

const searchIcon = document.getElementById("search-icon");

const hamburgerBar = document.getElementById("hamburger-bar");
const hamburgerBarContents = document.getElementById("hamburger-bar-opened");
const hamburgerBarCloser = document.getElementById("hamburger-bar-closer");

const productsContainer = document.getElementById("wishlist-items-container");

async function getAllProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    allProducts = products;
  } catch (error) {
    console.error(error);
  }
  console.log(allProducts);
  getFromCart();

  // bu method bir kere mi calistirilacak ? app.js te mi ?
}

getAllProducts();

function getFromCart() {
  wishlistItems =
    JSON.parse(localStorage.getItem("wishlistProducts")) ||
    [
      // allProducts[0],
      // allProducts[1],
      // allProducts[2],
      // allProducts[3],
      // allProducts[4],
      // allProducts[5],
      // allProducts[6],
      // allProducts[7],
    ];
  console.log(wishlistItems);

  // wishlistItems.forEach((product) => {
  //   if ("quantity" in product) {
  //   } else {
  //     product.quantity = 1;
  //   }
  // });

  let htmlProduct = "";
  if (wishlistItems.length == 0) {
    htmlProduct = `<h4 class="empty-cart">nO WISHED Items</h4>`;
    productsContainer.innerHTML += htmlProduct;
    // cartQuantityCircle.innerText = 0;
    // update heart icon
    return;
  }

  for (let i = 0; i < wishlistItems.length; i++) {
    htmlProduct = "";
    htmlProduct += `    <div class="wishlist-item">
                          <div class="wishlist-image-container">
                                <img class="wishlist-image" src="${wishlistItems[i].image}">
                          </div>
                          <button class="cart-add-button">Add to Cart</button>
                          <h4 class="wishlist-h4-title">${wishlistItems[i].title}</h4>
                          <h4 class="red-text">$ ${wishlistItems[i].price}</h4>
                        </div>
                      </div>`;
    productsContainer.innerHTML += htmlProduct;
  }
  // cartQuantityCircle.innerText = cartItems.length;
  // heart icon updater
}

hamburgerBar.addEventListener("click", () => {
  hamburgerBarContents.classList.add("hamburger-bar-toggled");
});

hamburgerBarCloser.addEventListener("click", () => {
  hamburgerBarContents.classList.remove("hamburger-bar-toggled");
});

button.addEventListener("click", () => {
  closeLangButton();
  //
  //  1. HOW TO CLOSE THIS WHEN ANYWHERE ELSE IS CLICKED ??
  //
});

function closeLangButton() {
  dropdown.classList.toggle("toggle-div");
}

function changeLang(languageId) {
  const language = document.getElementById(languageId);
  changingLang = button.innerText;
  button.innerHTML =
    language.innerText +
    `<i id="dropdown-icon" class="fa-solid fa-caret-down"></i>`;
  language.innerText = changingLang;
  event.preventDefault();
  // IS this correct ?
  //
  closeLangButton();
}

function updateHeartIcon() {}
