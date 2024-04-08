// DELETE LATER
// DELETE LATER
// DELETE LATER
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
  specialContentUpdater();
  timer24(86399);
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
  // function addToCart(productId) {
  //     const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
  //     const isAdded = cartItems.some((product) => product.id === productId);

  // isAdded error veriyor-   getItem null returnluyor ,product id null,
  // bos arrayi cartItems a geciremiyoruz.
  const nullOrNot = JSON.parse(localStorage.getItem("cartProducts"));
  const cartItems = [];
  if (nullOrNot === !null) {
    cartItems = JSON.parse(localStorage.getItem("cartProducts"));
  }

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
//ADD THE FUNCTIONALITY TO BUTTON FOR CHANGING PAGE
// DELETE LATER
// DELETE LATER
// DELETE LATER
