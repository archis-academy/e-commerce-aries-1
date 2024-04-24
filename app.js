const productsContainer = document.querySelector("#productsContainer");

console.log(productsContainer);
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

<button class="add-to-cart" id="add-to-cart-${product.id}" onclick="addToCart(${
        product.id
      })"><i class="fa-solid fa-cart-shopping"></i></button>

<button class="rem-from-cart" onclick="remFromCart(${
        product.id
      })"><img class="trash" height= "25" width="25" src="../images/trash.svg"></img> </button>
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

function getStars(rating) {
  let stars = ``;
  for (let i = 0; i < Math.round(rating); i++) {
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

let cartProducts = [];

function addToCart(productId) {
 
  const selectedProduct = allProducts.find((product) => {
    return product.id === productId;
     });
    cartProducts.push(selectedProduct);
    
  localStorage.setItem("SepeteEkle", JSON.stringify(cartProducts));
  alert(
    `${selectedProduct.id} 'li eklendi. Şimdi sepette toplam ${cartProducts.length}  ürün var`
  );
}

function remFromCart(productId) {
 
  const selectedProduct = cartProducts.find((product) => {
    return product.id === productId;
      });

  if(selectedProduct){
    let cartProductsFromStorage = JSON.parse(localStorage.getItem("SepeteEkle"));
      const filteredItems = cartProductsFromStorage.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("SepeteEkle", JSON.stringify(filteredItems));
     
      const indexProduct = cartProducts.indexOf(productId);
     cartProducts = filteredItems;
         alert(
        `${selectedProduct.id} 'li çıkarıldı. Şimdi sepette ${cartProducts.length} ürün var`
      );
   } else {

  alert("Ürün Sepette Yok");
}

}
getProducts();
