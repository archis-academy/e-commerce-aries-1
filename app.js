const productsContainer = document.querySelector("#productsContainer");
// const productsContainer = document.getElementById("#productsContainer");
// Niçin getelementByid kullanıldığında çalışmıyor.

let allProducts = [];

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  allProducts = products;
  renderTodaysProducts();
}

let todaysStart = 0;
let todaysEnd = 4;

const todaysRightBtn = document.querySelector("#todaysRightBtn");
const todaysLeftBtn = document.querySelector("#todaysLeftBtn");

todaysRightBtn.addEventListener("click", () => {
  todaysNavigationClick("next");
});
todaysLeftBtn.addEventListener("click", () => {
  todaysNavigationClick("prev");
});

function renderTodaysProducts() {
  const productHTML = allProducts
    .slice(todaysStart, todaysEnd)
    .map((product) => {
      return `
<div class="product-card">
<div class="image-container">
<h4 class="discount-rate">-40%</h4>
<img class="product-image" src="${product.image}" alt="${product.title}" /> 
<div class="icons-container">
<button class="wishlist-btn" onclick="addToWishlist(${
        product.id
      })"><i class="fa-regular fa-heart"></i></button>
<button class="add-to-cart-btn" onclick="addToCart(${
        product.id
      })"><i class="fa-solid fa-cart-shopping"></i></button>

</div>
</div>

<h3 class="product-title">  ${productText(product.title)}</h3>
<span class="product-price">${product.price}</span>

<div class="star-rating">
<span>${getStars(product.rating.rate)}</span> <span>(${
        product.rating.count
      })</span>

</div>
</div>`;
    })
    .join("");

  productsContainer.innerHTML = productHTML;
}
function todaysNavigationClick(direction) {
  const increment = direction === "next" ? 1 : -1;
  todaysStart += increment;
  todaysEnd += increment;

  if (todaysStart <= 0) {
    todaysStart = 0;
    todaysEnd = 4;
  } else if (todaysEnd >= 20) {
    todaysStart = 16;
    todaysEnd = 20;
  } else {
    todaysStart += increment;
    todaysEnd += increment;
  }
  renderTodaysProducts();
}
const intStarRating = (value) => {
  return Math.round(value);
};
function getStars(rating) {
  let stars = ``;
  for (let i = 0; i < rating.toFixed(0); i++) {
    stars += `<i class="fa-solid fa-star"></i>`;
  }
  return stars;
}

function productText(value) {
  const words = value.split(" ");
  return words.slice(0, 4).join(" ") + "";
}

function addToWishlist(productId) {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  const isWishlisted = wishlistProducts.find(
    (product) => product.id === productId
  );

  if (!isWishlisted) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );
    localStorage.setItem(
      "wishlistProducts",
      JSON.stringify([...wishlistProducts, productToAdd])
    );
    alert("Ürün favorilere eklendi");
  } else {
    deleteFromWishlist(productId);
    alert("Ürün favorilerden silindi");
  }

  function deleteFromWishlist(productId) {
    const wishlistProducts =
      JSON.parse(localStorage.getItem("wishlistProducts")) || [];

    const updatedWishlist = wishlistProducts.filter(
      (product) => product.id !== productId
    );

    localStorage.setItem("wishlistProducts", JSON.stringify(updatedWishlist));
  }
}

getProducts();
