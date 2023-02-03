// import json file from local storage
import products from "../data/products.json" assert { type: "json"};

// show/hide menu options
const navTooglers = document.querySelectorAll('[data-nav-toggler]');
const navBar = document.querySelector('nav')

navTooglers.forEach((item) => {
  item.addEventListener('click', () => {
    if(!navBar.classList.contains('active')){
      navBar.classList.add('active') 
    } else {
      navBar.classList.remove('active') 
    }
  }) 
})

// get html base elements to handle products
const productGridCard = document.getElementById('product-grid-cards');
const productsCategory = document.querySelectorAll('[category]');
const buttonShowAllProducts = document.getElementById('btn-show-all');

let coinBase = '$'
let productCategoryOption = ''
let productByCategoryFiltered = []

const renderProducts = (arr) => {
  productGridCard.innerHTML = arr.map(item => (
    `<div class="product-card" id="product-card">
      <p class="product-card-category" id="product-card-category">
        ${item.category}
      </p>
      <div class="product-card-image" id="product-card-image">
        <img src=${item.image} alt="Product Image">
      </div>
      <div class="product-card-content" id="product-card-content">
        <h2 class="product-card-content-title" id="product-card-content-title">
          ${item.title}
        </h2>
        <p class="product-card-content-description" id="product-card-content-description">
          ${item.description}
        </p>
        <p class="product-card-content-price" id="product-card-content-price">
          ${coinBase} ${item.price}
        </p>
      </div>
      <div class="product-card-content-rating">
        <p class="product-card-content-rating-rate" id="product-card-content-rating-rate">
        ${item.rating.rate}
        </p>
        <p class="product-card-content-rating-count" id="product-card-content-rating-count">
        ${item.rating.count}
        </p>
      </div>
      <button class="btn-add-to-cart" id="${item.id}">
        <i class="ph-bag"></i>
        <span>Add to cart</span>
      </button>
    </div>`
    )
  ).join('');
}

// get products category
productsCategory.forEach((item) => {
  item.addEventListener('click', () => {
    productCategoryOption = item.textContent
    buttonShowAllProducts.classList.add('active');
    products.map((item) => {
      if(item.category === productCategoryOption) {
        productByCategoryFiltered.push(item)
      }
    })
    renderProducts(productByCategoryFiltered)  
    productByCategoryFiltered = []
  })
})

// rendering product grid on HTML: by category or all
function renderProductGrid () {
  if(productByCategoryFiltered.length === 0){
    renderProducts(products)      
  } else {
    renderProducts(productByCategoryFiltered)       
  }
}

buttonShowAllProducts.addEventListener('click', ()=>{
  renderProducts(products)
  buttonShowAllProducts.classList.remove('active')
})

renderProductGrid()