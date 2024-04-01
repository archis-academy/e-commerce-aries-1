const productsContainer = document.querySelector("#productsContainer")
async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products")
  const products = await response.json()
  console.log(products)

const trimText = (value, number) => {
  return value.substring(0, number) + "..."
}
const productHTML = products.slice(5,9).map((product) => {
  return `
<div class="product-card">
<div class="image-container">
<h4 class="discount-rate">-40%</h4>
<img class="product-image" src="${product.image}" alt="${product.title}" /> 
<div class="icons-container">
<i class="fa-regular fa-heart"></i>
<i class="fa-regular fa-eye"></i>
</div>
</div>
<h3 class="product-title">  ${trimText(product.title, 25)}</h3>
<span class="product-price">${product.price}</span>
<span>${product.rating.rate}</span> <span>${product.rating.count}</span>

          </div>
`
})
.join("")
console.log(productHTML)
productsContainer.innerHTML = productHTML
}
// const productHTML = (start, end) => {
//   products.slice(start, end)......
//  }


// let start = 0;
// let end = 4;

// const nextProducts = () => {
// start ++; //0 iken 1 olacak
// end ++; //4 iken 5 olacak

// productsHTML(start, end); // Dolayısıyla artık 1 ve 5 arasındaki ürünleri gösterecek
// }

getProducts()
