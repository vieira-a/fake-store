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

// get html base elements to use in render products process
const productGridCard = document.getElementById('product-grid-cards');
const productGridCart = document.getElementById('product-cart-grid');
const productsCategory = document.querySelectorAll('[category]');
const buttonShowAllProducts = document.getElementById('btn-show-all');
const viewCartAmount = document.getElementById('view-cart-amount');
const viewCategoryInfo = document.getElementById('product-category-info');
let coinBase = '$'
let productCategoryOption = ''
let productByCategoryFiltered = []
let btnAddToCart = ''
let cartProducts = []
let amountViewCart = 0
viewCartAmount.textContent = amountViewCart

function updateTotalPrice(amount, price){
  return amount * price
}

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
        Rating: ${item.rating.rate} 
        </p>
        <p class="product-card-content-rating-count" id="product-card-content-rating-count">
        Votes: ${item.rating.count}
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
      cartProducts.push(
        {
          id: products[itemId].id,
          imagesrc: products[itemId].image,
          title: products[itemId].title, 
          amount: 1,
          price: products[itemId].price,
          total: updateTotalPrice(1, products[itemId].price)
        })
      item.disabled = true
      viewCartAmount.textContent = cartProducts.length
    })    
  })
}

const renderCartProducts = () => {
  let buttonBackToBuy = ''
  const cartEmptyMsg = 'Your cart is empty!'
  
  if(cartProducts.length <= 0) {
    productGridCart.innerHTML = 
    `<div class="empty-cart">
      <h2 class="msg-empty-cart">${cartEmptyMsg}</h2>
        <button id="btn-back-to-buy">
          <i class="ph-shopping-bag-open"></i>
          <span>Back to Buy</span>
        </button>
    </div>`

    buttonBackToBuy = document.getElementById('btn-back-to-buy')
    buttonBackToBuy.addEventListener('click', ()=> {
      cartSection.classList.remove('active')
    })
  } else {
    
    //render product cart
    productGridCart.innerHTML = cartProducts.map(item => (
      `<div class="cart-card">
        
        <div class="cart-card-header">
          <img src=${item.imagesrc} alt="Product Image" id="cart-card-img">
          <p>${item.title}</p>
        </div>

        <div class="cart-product-totals">
          <div class="cart-product-amount">

            <button class="btn-amount" id="btn-decrement-amount" productId=${item.id} aria-label="decrement amount">
              <i class="ph-minus"></i>
            </button>
              
            <p class="product-amount">${item.amount}</p>
            
            <button class="btn-amount" id="btn-increment-amount" productId=${item.id} aria-label="increment amount">
              <i class="ph-plus"></i>
            </button>
            
            <button class="btn-amount" productId=${item.id} id="btn-trash" aria-label="remove item from cart">
              <i class="ph-trash"></i>
            </button>

          </div>
          <div class="cart-product-price">
          <p class="product-price">${coinBase} ${item.total}</p>
          </div>
        </div>
      </div>
      `
    )).join('');

    const buttonTrash = document.querySelectorAll('#btn-trash');  
    const buttonIncrementAmount = document.querySelectorAll('#btn-increment-amount');
    const buttonDecrementAmount = document.querySelectorAll('#btn-decrement-amount');
     
    //update product amount on the cart
    let indexOfBtnIncrement
    let indexOfBtnDecrement
    cartProducts.map((cartProductItem) => {
      //increment
      buttonIncrementAmount.forEach(item => {
        item.addEventListener('click', () => {    
          indexOfBtnIncrement = Number(item.getAttribute('productId'));
          console.log(`*** BEFORE *** amount: ${cartProductItem.amount}*** price: ${cartProductItem.price}`)    
          if(cartProductItem.id === indexOfBtnIncrement){
            console.log(`*** product id: ${cartProductItem.id} *** index button: ${indexOfBtnIncrement}`)
            cartProductItem.amount++
            cartProductItem.total = updateTotalPrice(cartProductItem.amount, cartProductItem.price)   
            console.log(`*** AFTER *** amount: ${cartProductItem.amount}*** price: ${cartProductItem.total}`)       
          } 
          getCardAmount()
          renderCartProducts()  
        })               
      })
      //decrement
      buttonDecrementAmount.forEach(item => {
        item.addEventListener('click', () => {    
          indexOfBtnDecrement = Number(item.getAttribute('productId'));
          //console.log(`*** BEFORE *** amount: ${cartProductItem.amount}*** price: ${cartProductItem.price}`)    
          if(cartProductItem.id === indexOfBtnDecrement){
            //console.log(`*** product id: ${cartProductItem.id} *** index button: ${indexOfBtnDecrement}`)
            cartProductItem.amount--
            if(cartProductItem.amount === 0){
              cartProducts = cartProducts.filter(item => item.id != indexOfBtnDecrement)
            } else {
              cartProductItem.total = updateTotalPrice(cartProductItem.amount, cartProductItem.price)   
              //console.log(`*** AFTER *** amount: ${cartProductItem.amount}*** price: ${cartProductItem.total}`)       
            }
          } 
          getCardAmount()
          renderCartProducts()  
        })               
      })
    })
    
    //delete product from cart
    buttonTrash.forEach(item => {
      let indexOfBtnTrash = item.getAttribute('productId')
        item.addEventListener('click', ()=>{        
          cartProducts = cartProducts.filter(item => item.id != indexOfBtnTrash)
          //console.log('**** AFTER REMOVE', cartProducts)
          viewCartAmount.textContent = cartProducts.length
          getCardAmount()
          renderCartProducts()
        })
    })
  }
}

const cartAmountInfo = document.getElementById('section-cart-amount');

const getCardAmount = () => {
  let cartAmount = 0
  cartProducts.forEach(item => {
    cartAmount += Number(item.total)
  })
  cartAmountInfo.innerHTML = 
  `
  <p>(${cartProducts.length}) item(s)</p>
  <p>${coinBase} ${cartAmount.toFixed(2)}</p>
  `
}

const buttonViewCart = document.getElementById('view-cart');
const buttonCloseCart = document.getElementById('cart-close');
const cartSection = document.getElementById('cart');

buttonViewCart.addEventListener('click', () => {
  renderCartProducts()
  getCardAmount()
  cartSection.classList.add('active')
})

buttonCloseCart.addEventListener('click', ()=>{
  cartSection.classList.remove('active')
})

renderProducts(products)
viewCategoryInfo.innerHTML = `<h4>Products > Category: All</h4>`

// get products category
productsCategory.forEach((item) => {
  item.addEventListener('click', () => {
    productCategoryOption = item.textContent
    buttonShowAllProducts.classList.add('active');
    products.map((item) => {
      if(item.category === productCategoryOption) {
        productByCategoryFiltered.push(item)
        viewCategoryInfo.innerHTML = `<h4>Products > Category: ${productCategoryOption}</h4>`
      }
    })
    renderProducts(productByCategoryFiltered)  
    productByCategoryFiltered = []
  })
})

// render button to show all products
buttonShowAllProducts.addEventListener('click', ()=>{
  renderProducts(products)
  viewCategoryInfo.innerHTML = `<h4>Products > Category: All</h4>`
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