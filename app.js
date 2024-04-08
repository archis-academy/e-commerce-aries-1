const hoursE = document.getElementById("special-hours");
const minutesE = document.getElementById("special-minutes");
const secondsE = document.getElementById("special-seconds");

const specialImage = document.getElementById("special-image");

let allProducts = [];
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
  imageUpdater();
  timer24(86399);
}

function imageUpdater() {
  const randomElement =
    allProducts[Math.floor(Math.random() * allProducts.length)];
  console.log(randomElement.category);
  specialImage.setAttribute("src", `${randomElement.image}`);
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
    hoursE.innerText = hours;
    minutesE.innerText = minutes;
    secondsE.innerText = seconds;
  }, 1000);
}
