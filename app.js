const productsContainer = document.querySelector("#exploreProducts");

let allProducts = [];

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  allProducts = data;
  renderExploreProducts();
}

getProducts();

/* SALIH HOMEPAGE EXPLORE PRODUCTS */

/* RENDER FUNCTION */
let exploreStart = 0;
let exploreEnd = 8;

function renderExploreProducts() {
  const productHTML = allProducts
    .slice(exploreStart, exploreEnd)
    .map((product) => {
      return `
<div class="explore-card">
<div class="image-container card">
<img class="product-image" src="${product.image}" alt="${product.title}" />
  <div class="overlay">
            <div class="text" id="addToCart_${product.id}" onclick="addToCart(${
        product.id
      })">Add To Cart</div>
        </div>
</div>
<h3 class="product-title">  ${productText(product.title)}</h3>
<div class="rating-score">
<span class="product-price">$${product.price}</span>
<p> ${getStars(product.rating.rate)}</p>
<p> (${product.rating.count})</p>
</div>
</div>
`;
    })
    .join("");

  exploreProducts.innerHTML = productHTML;
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
  exploreEnd = allProducts.length;
  exploreStart = 0;
  renderExploreProducts();
}

function nextBtn() {
  if (exploreEnd < allProducts.length) {
    exploreStart += 8;
    exploreEnd += 8;
    renderExploreProducts();
  }
}

function backBtn() {
  if (exploreStart > 0) {
    exploreStart -= 8;
    exploreEnd -= 8;
    renderExploreProducts();
  }
}
/* SALIH HOMEPAGE EXPLORE PRODUCTS END */
