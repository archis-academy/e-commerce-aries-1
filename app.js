const productsContainer = document.querySelector("#productsContainer")

let allProducts = []

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products")
  const products = await response.json()
  allProducts = products
  renderTodaysProducts()
}

let todaysStart = 0
let todaysEnd = 4

const todaysRightBtn = document.querySelector("#todaysRightBtn")
const todaysLeftBtn = document.querySelector("#todaysLeftBtn")

todaysRightBtn.addEventListener("click", () => {
  todaysNavigationClick("next")
})
todaysLeftBtn.addEventListener("click", () => {
  todaysNavigationClick("prev")
})

function renderTodaysProducts() {
  const trimText = (value, number) => {
    return value.substring(0, number) + "..."
  }

  const productHTML = allProducts
    .slice(todaysStart, todaysEnd)
    .map((product) => {
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

<h3 class="product-title">  ${trimText(product.title, 18)}</h3>
<span class="product-price">${product.price}</span>

<div class="star-rating">
<span>${intStarRating(product.rating.rate)}</span> <span>(${product.rating.count})</span>

</div>
</div>
`
    })
    .join("")
    // const starNumbers = (value) => {
    // switch (value){
    //   case 1: 
    //   return `<i class="fa-regular fa-star"></i>`;
    //   break
    //   case 2:
    //   return `<i class="fa-regular fa-star"></i> 
    //   <i class="fa-regular fa-star"></i>`
    //   break
    //   case 3:
    //   return `<i class="fa-regular fa-star"></i>
    //   <i class="fa-regular fa-star"></i>
    //   <i class="fa-regular fa-star"></i>`
    //   break
    //   case 4:
    //   return `<i class="fa-regular fa-star"></i>
    //   <i class="fa-regular fa-star"></i>
    //   <i class="fa-regular fa-star"></i>
    //   <i class="fa-regular fa-star"></i>`
    //   break
    //   case 5:
    //   return `<i class="fa-regular fa-star"></i>
    //   <i class="fa-regular fa-star"></i>
    //   <i class="fa-regular fa-star"></i>
    //   <i class="fa-regular fa-star"></i>
    //   <i class="fa-regular fa-star"></i>
    //   `
    //   break
    // }
  
    // }

  productsContainer.innerHTML = productHTML
}
function todaysNavigationClick(direction) {
  const increment = direction === "next" ? 1 : -1
  todaysStart += increment
  todaysEnd += increment
  renderTodaysProducts()
}
const intStarRating = (value) => {
    return Math.round(value)
  }

getProducts()
