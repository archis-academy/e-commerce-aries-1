const button = document.getElementById("btn-lang");
const dropdown = document.getElementById("hl-dropdown-content");

const searchBarRes = document.getElementById("search-bar-results");
const userInputField = document.getElementById("user-input");

let selectedButton = document.getElementById("btn3");

const changingImage = document.getElementById("image1");

let language = document.getElementById("btn-lang");

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

// const searchres = document.getElementById("abcd");
let allProducts = [];

async function getAllProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    allProducts = products;
  } catch (error) {
    console.error(error);
  }
}

getAllProducts();

// searchres.innerHTML = "aasdadsas";

button.addEventListener("click", () => {
  dropdown.classList.toggle("toggle-div");
});

userInputField.addEventListener("focus", () => {
  searchBarRes.classList.add("search-bar-visible");
});

userInputField.addEventListener("blur", () => {
  searchBarRes.classList.remove("search-bar-visible");
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

//  const searchResultHTML = products.map((product) => {
//   return `<h5> ${product.title}</h5>`;
//  });

// searchres.innerHTML = searchResultHTML;

// console.log(searchResultHTML);
