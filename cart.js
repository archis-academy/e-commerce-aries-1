const button = document.getElementById("btn-lang");
const dropdown = document.getElementById("hl-dropdown-content");

const searchBarRes = document.getElementById("search-bar-results");
const userInputField = document.getElementById("user-input");

const searchIcon = document.getElementById("search-icon");

const hamburgerBar = document.getElementById("hamburger-bar");
const hamburgerBarContents = document.getElementById("hamburger-bar-opened");
const hamburgerBarCloser = document.getElementById("hamburger-bar-closer");

const productsContainer = document.getElementById("product-info-container");
const cartSubtotal = document.getElementById("total-subtotal");
const cartSubtotalDiscounted = document.getElementById(
  "total-subtotal-discounted"
);

const cartQuantityCircle = document.getElementById("cart-quantity-identicator");

const couponButton = document.getElementById("coupon-button");

const totalCost = [];
// const itemQuantity = document.getElementsByClassName("item-quantity");
let itemQuantity = 1;
let totalPrice = "";
let discounteState = false;

let coupons = ["NEWYEAR2024", "EIDMUBARAK", "BLACKFRIDAY"];

// NEDEN GET ELEMENT BY CLASS NAME CALISIYOR , AMM GET ELEMENT BY ID CALISMIYOR ??

let allProducts = [];
let cartItems = [];

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

couponButton.addEventListener("click", () => {
  let couponCode = document.getElementById("coupon-input").value;
  checkOutCoupon(couponCode);
});

function checkOutCoupon(code) {
  if (discounteState) {
    return;
    //function u durdurma boyle mi ? Q4
  }

  for (coupon in coupons) {
    if (coupons[coupon].toLowerCase() === code.toLowerCase()) {
      discounteState = true;
    }
  }

  if (discounteState) {
    cartSubtotalDiscounted.innerText =
      (
        parseFloat(cartSubtotalDiscounted.innerText.replace("$", "")) * 0.6
      ).toFixed(2) + "$";
  } else {
    // ADD TEXT TO STATE ITS INVALID.
  }
}

function getFromCart() {
  cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [
    allProducts[6],
    allProducts[7],
    allProducts[8],
    allProducts[9],
    allProducts[10],
  ];
  console.log(cartItems);

  // APP . js fileinda neler olacak ?
  //tum sayfalarda gecerli olan variable lar mi orada olacak import eedilmek icin ?

  // INSPECTDEN APPLICATIONSDA LCOALSTORAGE IN ICINDE BIR ITEM VAR,
  // ONUN NEREDE EKLENDIGINI NASIL GORE BILIRIM >>>>
  // INdex sayfasinda eklemistim, fakat sildikten sonra yine geliyor getFromCart methodunu calistirdigimda

  for (let i = 0; i < cartItems.length; i++) {
    let htmlProduct = "";
    htmlProduct += `<div class="product-info">
                          <div class="image-and-title">
                          <img class="item-image" src="${cartItems[i].image}">
                          <h4 class="item-title-h4">${cartItems[i].title}</h4>
                          </div>
                          <h4>${cartItems[i].price}$</h4>
                          <div class="quantity-button">
                            <div class="quantity-button-contents">
                            <h4 id="item-quantity-${i}">1</h4>
                            <div class="button-div">
                              <button onClick="quantityPlus(${cartItems[i].price}, ${i}
                              )" class="button-up" id="button-up"></button>
                              <button onClick="quantityMinus(${cartItems[i].price}, ${i}
                              )" class="button-down" id="button-down"></button>
                            </div>
                            </div>
                          </div>
                          <h4 id="subtotal-price-${i}">${cartItems[i].price}$</h4>
                      </div>`;
    // ID YE INDEXI EKLEYEREK CALISTIRIYORUM BU DOGRU MU ?? Q2 Q2
    productsContainer.innerHTML += htmlProduct;
    totalCost[i] = cartItems[i].price;
  }
  cartQuantityCircle.innerText = cartItems.length;
  updateSubtotal();
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

function quantityPlus(price, index) {
  itemQuantity = document.getElementById(`item-quantity-${index}`);
  totalPrice = document.getElementById(`subtotal-price-${index}`);
  console.log(`subtotal-price-${index}`);
  let quantity = parseInt(itemQuantity.innerText, 10);
  quantity++;
  itemQuantity.innerText = quantity;
  let finalPrice = (price * quantity).toFixed(2);
  totalPrice.innerText = finalPrice + "$";

  totalCost[index] = parseFloat(finalPrice);
  // neden parse int yapmam gerekiyor ?? Q333

  console.log(finalPrice);
  updateSubtotal();
}

function quantityMinus(price, index) {
  itemQuantity = document.getElementById(`item-quantity-${index}`);
  totalPrice = document.getElementById(`subtotal-price-${index}`);
  let quantity = parseInt(itemQuantity.innerText, 10);

  if (quantity > 1) {
    quantity--;
    itemQuantity.innerText = quantity;

    let finalPrice = (price * quantity).toFixed(2);
    totalPrice.innerText = finalPrice + "$";

    totalCost[index] = parseFloat(finalPrice);
  } else {
    cartItems.splice(index, 1);

    let newCartArr = JSON.stringify(cartItems);
    localStorage.setItem("cartProducts", newCartArr);
    updateCart();
  }
  updateSubtotal();
}

function updateSubtotal() {
  let cost = 0;
  for (let i = 0; i < cartItems.length; i++) {
    cost += totalCost[i];
    console.log(cost);
  }
  cartSubtotal.innerText = cost.toFixed(2) + "$";

  if (discounteState) {
    cartSubtotalDiscounted.innerText = (cost * 0.6).toFixed(2) + "$";
  } else {
    cartSubtotalDiscounted.innerText = cost.toFixed(2) + "$";
  }
}

function updateCart() {
  productsContainer.innerHTML = ` <div class="product-info">
  <h4 id="title">Product</h4>
  <h4>Price</h4>
  <h4>Quantity</h4>
  <h4>Subtotal</h4>
</div>`;
  getFromCart();
  //  HTML ICINDEKI BU KISIM NEDEN SILINMIYOR ? Q44444
  //productsContainer.innerHTML = ""; silmesi gerekmiyor muy ?

  //<div class="product-info">
  //   <h4 id="title">Product</h4>
  //   <h4>Price</h4>
  //   <h4>Quantity</h4>
  //   <h4>Subtotal</h4>
  // </div>

  // Q555 ]
  // HER SAYFA REFRESHELNDIGINDE, VE UPDATE CART METHODU CAGIRILDIGINDA
  // QUANTITYLERI KAYBEDIYORUM,
  // LOCAL STORAGE E CART ITEM I EKLERKEN QUANTITY VARIABLE I EKLEMEM DOGRU OLUR MU??
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
