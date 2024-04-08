const button = document.getElementById("btn-lang");
const dropdown = document.getElementById("hl-dropdown-content");

const searchBarRes = document.getElementById("search-bar-results");
const userInputField = document.getElementById("user-input");

const searchIcon = document.getElementById("search-icon");

const hamburgerBar = document.getElementById("hamburger-bar");
const hamburgerBarContents = document.getElementById("hamburger-bar-opened");
const hamburgerBarCloser = document.getElementById("hamburger-bar-closer");

let allProducts = [];

async function getAllProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    allProducts = products;
  } catch (error) {
    console.error(error);
  }
  console.log(allProducts);
}

getAllProducts();

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

userInputField.addEventListener("focus", () => {
  searchBarRes.classList.add("search-bar-visible");
  searchIcon.classList.add("search-icon-invisible");
});

userInputField.addEventListener("blur", () => {
  searchBarRes.classList.remove("search-bar-visible");
  searchIcon.classList.remove("search-icon-invisible");
});

userInputField.addEventListener("keyup", () => {
  let a = document.getElementById("user-input").value;
  searchBarRes.innerHTML = userSearchResults(a);
});

function userSearchResults(input) {
  let results = new Array();
  if (input.length == 0) {
    return [];
  }
  allProducts.forEach((element) => {
    if (element.title.toLowerCase().includes(input.toLowerCase())) {
      results.push(element.title);
      console.log(input + "a");
      console.log(element.title);
    }
  });
  let htmlResult = "";

  console.log(results.length);
  let length = 0;
  if (results.length > 10) {
    length = 10;
  } else {
    length = results.length;
  }
  console.log(length);
  for (let i = 0; i < length; i++) {
    htmlResult += `<h5 class="text-results" >${results[i]}</h5> \n`;
  }
  return htmlResult;
}

// Method from Salih
function addToCart(productId) {
  const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const isAdded = cartItems.some((product) => product.id === productId);

  if (!isAdded) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );

    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartItems, productToAdd])
    );
  } else {
    deleteCartProduct(productId);
  }
}
