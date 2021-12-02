/*

This is how an item object should look like

{
  id: 1, // <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 // <- You can come up with your own prices
}

*/

/*
Deliverables
- A user can view a selection of items in the store
- From the store, a user can add an item to their cart
- From the cart, a user can view and adjust the number of items in their cart
- If an item's quantity equals zero it is removed from the cart
- A user can view the current total in their cart

Instructions
- Create a state object
- Create action functions that update state
- Create render functions  that read from state and update the visuals

Tips
- Start with the logic first, use console.log(state) to check your logic is working; when the logic is working as expected move onto styling
- Taking HTML semantics into consideration, use a button when an action is happening on the same page
*/

const storeUlEl = document.querySelector(".store--item-list")
const cartUlEl = document.querySelector(".cart--item-list")
const totalSpanEl = document.querySelector(".total-number")

const state = {

  items: [
    {
      id:'001',
      name: 'beetroot',
      price: 0.35,
    },
    {
      id:'002',
      name: 'carrot',
      price: 0.25,

    },
    {
      id:'003',
      name: 'apple',
      price: 0.50,

    },
    {
      id:'004',
      name: 'apricot',
      price: 0.65,

    },
    {
      id:'005',
      name: 'avocado',
      price: 1.00,

    },
    {
      id:'006',
      name: 'bananas',
      price: 1.00,

    },
    {
      id:'007',
      name: 'bell-pepper',
      price: 1.00,

    },
    {
      id:'008',
      name: 'berry',
      price: 1.00,

    },
    {
      id:'009',
      name: 'blueberry',
      price: 1.00,
    },
    {
      id:'010',
      name: 'eggplant',
      price: 1.00,
    },
  ],

  cartItems: []
}

// console.log(state)

function addToCart(item) {
	const itemFound = state.cartItems.find(function (cartItem) {
		return cartItem.name === item.name
	})
	if (itemFound === undefined) {
		const newCartItem = {
			id: item.id,
			name: item.name,
			price: item.price,
			quantity: 1
		}
		state.cartItems.push(newCartItem)
	} else {
		itemFound.quantity++
	}
}

function removeFromCart(item) {
	const itemFound = state.cartItems.find(function (cartItem) {
		return cartItem.name === item.name
	})
	itemFound.quantity--
	if (itemFound.quantity === 0) {
		state.cartItems = state.cartItems.filter(function (cartItem) {
			return cartItem.quantity > 0
		})
	}
}

function calculatePrice() {
  let total = 0
  for (item of state.cartItems) {
    total = total + item.price * item.quantity
  }
  return total.toFixed(2)
}

function renderTotalPrice() {
  totalSpanEl.textContent = `£${calculatePrice()}`
}

function createStoreItem() {
  storeUlEl.innerHTML = ""
  for (const item of state.items) {
  const storeLiEl = document.createElement('li')
  
  const storeDivEl = document.createElement('div')
  storeDivEl.setAttribute('class', 'store--item-icon')
  
  const storeImgEl = document.createElement('img')
  storeImgEl.setAttribute('src', `assets/icons/${item.id}-${item.name}.svg`)
  storeImgEl.setAttribute('alt', `${item.name}`)
  
  storeDivEl.append(storeImgEl)

  const storeBtnEl = document.createElement('button')
  storeBtnEl.textContent = "Add to cart"
  storeBtnEl.addEventListener('click', function () {
    addToCart(item)
			render()
  })
  
  storeLiEl.append(storeDivEl, storeBtnEl)

  storeUlEl.append(storeLiEl) 
  }
}

function createCartItem() {
  cartUlEl.innerHTML = ""
  for (const item of state.cartItems) {
    const cartLiEl = document.createElement('li')
    
    const cartImgEl = document.createElement('img')
    cartImgEl.setAttribute('class', 'cart--item-icon')
    cartImgEl.setAttribute('src', `assets/icons/${item.id}-${item.name}.svg`)
    cartImgEl.setAttribute('alt', `${item.name}`)
    
    const cartPEl = document.createElement('p')
    cartPEl.textContent = item.name

    const cartRemoveBtnEl = document.createElement('button')
    cartRemoveBtnEl.setAttribute('class', 'quantity-btn remove-btn center')
    cartRemoveBtnEl.textContent = "-"
    cartRemoveBtnEl.addEventListener("click", function () {
			removeFromCart(item)
			render()
		})

    const spanEl = document.createElement('span')
    spanEl.setAttribute('class', 'quantity-text center')
    spanEl.textContent = item.quantity

    const cartAddBtnEl = document.createElement('button')
    cartAddBtnEl.setAttribute('class', 'quantity-btn add-btn center')
    cartAddBtnEl.textContent = "+"
    cartAddBtnEl.addEventListener("click", function () {
			addToCart(item)
      render()
		})

    cartLiEl.append(cartImgEl, cartImgEl, cartPEl, cartRemoveBtnEl, spanEl, cartAddBtnEl)
    cartUlEl.append(cartLiEl)
  }
}

function render() {
  createStoreItem()
  createCartItem()
  renderTotalPrice()
}

render()
