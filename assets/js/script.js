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
const productGridCart = document.getElementById('product-cart-grid');
const productsCategory = document.querySelectorAll('[category]');
const buttonShowAllProducts = document.getElementById('btn-show-all');
const viewCartAmount = document.getElementById('view-cart-amount');

let coinBase = '$'
let productCategoryOption = ''
let productByCategoryFiltered = []
let btnAddToCart = ''
let cartProducts = []
let amountViewCart = 0
viewCartAmount.textContent = amountViewCart

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
      <button class="btn-add-to-cart" id="${item.id}" add-to-cart>
        <i class="ph-bag"></i>
        <span>Add to cart</span>
      </button>
    </div>`
    )
  ).join('');

  // fill cartProducts array
  btnAddToCart = document.querySelectorAll('[add-to-cart]');

  btnAddToCart.forEach((item) => { 
    item.addEventListener('click', () => {  
      let itemId = item.id - 1
      cartProducts.push({
        id: products[itemId].id,
        imagesrc: products[itemId].image,
        title: products[itemId].title, 
        price: products[itemId].price,
        amount: 1
      })
      viewCartAmount.textContent = cartProducts.length
    })    
  })
}

const renderCartProducts = () => {
  productGridCart.innerHTML = cartProducts.map(item => (
    `<div class="cart-card">
      
      <div class="cart-card-header">
        <img src=${item.imagesrc} alt="Product Image" id="cart-card-img">
        <p>${item.title}</p>
      </div>

      <div class="cart-product-totals">
        <div class="cart-product-amount">
          <button class="btn-amount" id="btn-minus"><i class="ph-minus" aria-label="decrement amount"></i></button>
          <p class="product-amount">${item.amount}</p>
          <button class="btn-amount" id="btn-plus" aria-label="increment amount"><i class="ph-plus"></i>
          </button>
          <button class="btn-amount" id="btn-trash" aria-label="remove item from cart"><i class="ph-trash"></i></button>
        </div>
        <div class="cart-product-price">
         <p class="product-price">${coinBase} ${item.price}</p>
        </div>
      </div>
    </div>
    `
  )).join('');
}
const cartAmountInfo = document.getElementById('section-cart-amount');

const getCardAmount = () => {
  let cartAmount = 0
  cartProducts.forEach(item => {
    cartAmount += Number(item.price)
  })
  cartAmountInfo.innerHTML = 
  `
  <p>(${cartProducts.length}) item(s)</p>
  <p>${coinBase} ${cartAmount}</p>
  `
}

const buttonViewCart = document.getElementById('view-cart');
const buttonCloseCart = document.getElementById('cart-close');
const cartSection = document.getElementById('cart');
const bodyMainSection = document.getElementById('main')

buttonViewCart.addEventListener('click', () => {
  renderCartProducts()
  getCardAmount()
  cartSection.classList.add('active')
})

buttonCloseCart.addEventListener('click', ()=>{
  cartSection.classList.remove('active')
})

renderProducts(products)

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

// render button to show all products
buttonShowAllProducts.addEventListener('click', ()=>{
  renderProducts(products)
  buttonShowAllProducts.classList.remove('active')
})

// add button back to top on scrollY
const backToTop = document.getElementById('btn-back-to-top');
window.addEventListener("scroll", () => {
  if (window.scrollY > 350) {
    backToTop.classList.add('active')
  } else {
    backToTop.classList.remove('active')
  }
});