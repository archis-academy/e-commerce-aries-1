const button = document.getElementById("btn-lang");
const dropdown = document.getElementById("hl-dropdown-content");

const searchBarRes = document.getElementById("search-bar-results");
const userInputField = document.getElementById("user-input");

const searchIcon = document.getElementById("search-icon");

let selectedButton = document.getElementById("btn3");

const changingImage = document.getElementById("image1");

const hamburgerBar = document.getElementById("hamburger-bar");
const hamburgerBarContents = document.getElementById("hamburger-bar-opened");
const hamburgerBarCloser = document.getElementById("hamburger-bar-closer");

const catContainer = document.getElementById("cat-container");

let containerItems = [
  { src: "cat-camera.svg", title: "Camera" },
  { src: "cat-celphone.svg", title: "Cellphone" },
  { src: "cat-computer.svg", title: "Computer" },
  { src: "cat-gamepad.svg", title: "Gamepad" },
  { src: "cat-headphone.svg", title: "Hadphone" },
  { src: "cat-smartwatch.svg", title: "Smartwatch" },
];

const hoursE = document.getElementById("special-hours");
const minutesE = document.getElementById("special-minutes");
const secondsE = document.getElementById("special-seconds");

const specialImage = document.getElementById("special-image");
const specialContent = document.getElementById("special-item-content");

const addToCartButton = document.getElementById("add-to-cart-button");

let allProducts = [];
let randomElement = {};
getAllProducts();

async function getAllProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    allProducts = products;
  } catch (error) {
    console.error(error);
  }
  console.log(allProducts);
  loadContainer();
  specialContentUpdater();
  timer24(86399);
}



hamburgerBar.addEventListener("click", () => {
  hamburgerBarContents.classList.add("hamburger-bar-toggled");
});

hamburgerBarCloser.addEventListener("click", () => {
  hamburgerBarContents.classList.remove("hamburger-bar-toggled");
});

let images = [
  "/images/carousell-images/iphonee.svg",
  "/images/carousell-images/gucci-perfume.png",
  "/images/carousell-images/playstation5.png",
  "/images/carousell-images/speakers.png",
  "/images/carousell-images/woman-with-hat.png",
];

function imageChanger(i, elementId) {
  changingImage.setAttribute("src", images[i - 1]);
  selectedButton.classList.remove("active-btn");
  selectedButton = document.getElementById(elementId);
  selectedButton.classList.add("active-btn");
}

button.addEventListener("click", () => {
  closeLangButton();
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

function loadContainer() {
  let categoriesHtml = "";
  for (let i = 0; i < containerItems.length; i++) {
    categoriesHtml += `
      <div class="container-2-items" onmouseout="changeSVGcolorBlack(${i})"  onmouseover="changeSVGcolorWhite(${i})"> 
        <img id="${i}" src="/images/${containerItems[i].src}">
        <h4>${containerItems[i].title}</h4>
      </div>
    `;
  }
  catContainer.innerHTML += categoriesHtml;
}


function changeSVGcolorWhite(i) {
  let element = document.getElementById(i);
  element.classList.add("filter-color-white");
  element.classList.remove("filter-color-black");
}

function changeSVGcolorBlack(i) {
  let element = document.getElementById(i);
  element.classList.add("filter-color-black");
  element.classList.remove("filter-color-white");
  
}

function specialContentUpdater() {
  randomElement = allProducts[Math.floor(Math.random() * allProducts.length)];
  console.log(randomElement.category);
  specialImage.setAttribute("src", `${randomElement.image}`);
  //   specialContent.innerText = randomElement.title;
}

function timer24(timer) {
  setInterval(() => {
    let hours = parseInt((timer / 3600) % 24, 10);
    let minutes = parseInt((timer / 60) % 60, 10);
    let seconds = parseInt(timer % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timer = timer - 1;
    console.log(timer + "  " + hours + ":" + minutes + ":" + seconds);
    hoursE.innerHTML = hours + "<br>hours";
    minutesE.innerHTML = minutes + "<br>minutes";
    secondsE.innerHTML = seconds + "<br>seconds";
  }, 1000);
  //   Date ile nasil yapa bilirim ? yarindan bugun u cikarak ?
  //   Date ile bugunun tarihini alip freeze leye biliyormuyuz ?
}

addToCartButton.onclick = function () {
  console.log(randomElement.title + "oruj");
  console.log(randomElement.id + "oruj");

  addToCart(randomElement.id);
  location.href = "cart.html";
};

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
    // deleteCartProduct(productId);
  }
}
