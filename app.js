const productsContainer = document.querySelector("#exploreProducts");
let products;
async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  products = await response.json();
  console.log(products);

  const productText = (value) => {
    const words = value.split(" ");
    return words.slice(0, 4).join(" ") + "";
  };

  function getStars(rating) {
    let stars = ``;
    for (let i = 0; i < rating.toFixed(0); i++) {
      stars += `<img src= "images/star1.png" />`;
    }
    return stars;
  }

  const productHTML = products
    .slice(0, 8)
    .map((product, index) => {
      return `
<div class="explore-card">
<div class="image-container card">
<img class="product-image" src="${product.image}" alt="${product.title}" /> 
  <div class="overlay">
            <div class="text" onclick="addToCart(${index})">Add to Cart</div>
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
  console.log(productHTML);

  exploreProducts.innerHTML = productHTML;
}

getProducts();

function addToCart(index) {
  const selectedProduct = products[index];
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.push(selectedProduct);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  console.log("Ürün sepete eklendi:", selectedProduct);
}
