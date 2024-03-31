const button = document.getElementById("btn");
const dropdown = document.getElementById("hl-dropdown-content");

const searchBarRes = document.getElementById("search-bar-results");
const userInputField = document.getElementById("user-input");

// const searchres = document.getElementById("abcd");
let products = [];

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
  products.forEach((element) => {
    if (element.title.toLowerCase().includes(input.toLowerCase())) {
      results.push(element.title);
      console.log(input);
      console.log(results);
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
  for (let i = 0; i < length; i++) {
    htmlResult += `<h5 class="text-results">${results[i]}</h5> \n`;
  }
  return htmlResult;
}

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  products = await response.json();
  console.log(products);

  //  const searchResultHTML = products.map((product) => {
  //   return `<h5> ${product.title}</h5>`;
  //  });

  // searchres.innerHTML = searchResultHTML;

  // console.log(searchResultHTML);
}

getProducts();
