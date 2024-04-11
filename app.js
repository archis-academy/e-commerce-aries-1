const button = document.getElementById("btn-lang");
const dropdown = document.getElementById("hl-dropdown-content");

const searchBarRes = document.getElementById("search-bar-results");
const userInputField = document.getElementById("user-input");

const searchIcon = document.getElementById("search-icon");

const hamburgerBar = document.getElementById("hamburger-bar");
const hamburgerBarContents = document.getElementById("hamburger-bar-opened");
const hamburgerBarCloser = document.getElementById("hamburger-bar-closer");

const productsContainer = document.getElementById("product-info-container");
// const itemQuantity = document.getElementsByClassName("item-quantity");
let itemQuantity = 1;
let totalPrice = "";

// NEDEN GET ELEMENT BY CLASS NAME CALISIYOR , AMM GET ELEMENT BY ID CALISMIYOR ??

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
  getFromCart();
}

getAllProducts();

function getFromCart() {
  const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
  for (let i = 0; i < cartItems.length; i++) {
    let htmlProduct = "";
    htmlProduct += `<div class="product-info">
                          <h4>${cartItems[0].title}</h4>
                          <h4>${cartItems[0].price}</h4>
                          <div class="quantity-button">
                            <div class="quantity-button-contents">
                            <h4 id="item-quantity">1</h4>
                            <div class="button-div">
                              <button onClick="quantityPlus(${cartItems[0].price})" class="button-up" id="button-up"></button>
                              <button onClick="quantityMinus(${cartItems[0].price})" class="button-down" id="button-down"></button>
                            </div>
                            </div>
                          </div>
                          <h4 id="subtotal-price">${cartItems[0].price}$</h4>
                      </div>`;
    productsContainer.innerHTML += htmlProduct;
    itemQuantity = document.getElementById("item-quantity");
    totalPrice = document.getElementById("subtotal-price");
    // BU METHODDA EKLEMEM GEREKTI ? DOGRU MU ?
    // yazdigimiz html elemente ulasamadim id ile.

    // bu neden calismadi ?
    //for(product in cartItems){
    // const htmlProduct = `<div class="product-info">
    //                       <h4>${product.title}</h4>
    //                       <h4>${product.price}</h4>
    //                       <h4>1</h4>
    //                       <h4>${product.price}</h4>
    //                   </div>`;}
  }
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

function quantityPlus(price) {
  let quantity = parseInt(itemQuantity.innerText, 10);
  quantity++;
  itemQuantity.innerText = quantity;
  totalPrice.innerText = (price * quantity).toFixed(2) + "$";
  console.log(price * quantity);
}

function quantityMinus(price) {
  let quantity = parseInt(itemQuantity.innerText, 10);
  if (quantity > 1) {
    quantity--;
    itemQuantity.innerText = quantity;
    totalPrice.innerText = (price * quantity).toFixed(2) + "$";
  }
}

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

// Get i nerede kullanacagiz ? Her page refreshlendiginde nasil gelecek ?
