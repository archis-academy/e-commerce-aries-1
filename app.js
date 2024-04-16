const productsContainer = document.querySelector("#bestProducts");

let allProducts = [];

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  allProducts = data;
  renderBestProducts();
}

getProducts();

/* SALIH BEST SELLING PRODUCTS  */

let bestStart = 0;
let bestEnd = 4;

function renderBestProducts() {
  const productHTML = allProducts
    .slice(bestStart, bestEnd)
    .map((product, index) => {
      let discountedPrice = product.price;
      if (index < 2) {
        discountedPrice *= 0.8;
      }

      return `
        <div class="best-card">
          <div class="image-container card">
            <img class="product-image" src="${product.image}" alt="${
        product.title
      }" />
            <div class="overlay">
              <div class="text" id="addToCart_${
                product.id
              }" onclick="addToCart(${product.id})">Add To Cart</div>
            </div>
          </div>
          <h3 class="product-title">  ${productText(product.title)}</h3>
          <div class="rating-score">
            ${
              index < 2
                ? `<span class="discount-price">$${discountedPrice.toFixed(
                    2
                  )}</span>`
                : ""
            }
            <span class="product-price">${
              index < 2
                ? `<del>$${product.price.toFixed(2)}</del>`
                : `$${product.price.toFixed(2)}`
            }</span>
            <p> ${getStars(product.rating.rate)}</p>
            <p> (${product.rating.count})</p>
          </div>
        </div>
      `;
    })
    .join("");

  bestProducts.innerHTML = productHTML;
}
/* UTIL FUNCTIONS */

function productText(value) {
  const words = value.split(" ");
  return words.slice(0, 4).join(" ") + "";
}

function getStars(rating) {
  let stars = ``;
  for (let i = 0; i < rating.toFixed(0); i++) {
    stars += `<img src= "images/star1.png" />`;
  }
  return stars;
}

function addToCart(productId) {
  const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const isAdded = cartItems.some((product) => product.id === productId);
  const addButton = document.querySelector(`#addToCart_${productId}`);

  if (!isAdded) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );

    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartItems, productToAdd])
    );
    addButton.textContent = "Remove From Cart";
  } else {
    deleteCartProduct(productId, cartItems);
    addButton.textContent = "Add To Cart";
  }
}

function deleteCartProduct(productId, cartItems) {
  const filteredItems = cartItems.filter((product) => product.id !== productId);

  localStorage.setItem("cartProducts", JSON.stringify(filteredItems));
}

function viewAll() {
  bestEnd = allProducts.length;
  bestStart = 0;
  renderBestProducts();
}

/* SALIH BEST SELLING PRODUCTS  */
