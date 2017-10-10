import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addItem: ['item'],
  adjustItem: ['item'],
  removeItem: ['productId'],
  clear: null,
})

export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  items: [],
  totalPrice: 0,
  itemCount: 0,
})

/* ------------- Reducers ------------- */

export const addItem = (state, { item }) => {
  // add new item to cart
  const {productId, quantity, price} = item;

  const filteredItem = state.items.filter( fItem => fItem.productId == productId);
  
  let items = state.items;
  if(filteredItem.length === 0) {
    items = items.concat(item);
  }
  else {
    items = items.map( item => 
      item.productId === productId 
      ? item.set('quantity', item.quantity + quantity).set('price', item.price + price)
      : item)
  }
  let sumQuantity = getSumQuantity(items);
  const itemCount = sumQuantity > 99 ? 99 : sumQuantity;
  const totalPrice = getSumPrice(items);
  return state.merge({ items, itemCount, totalPrice });
}

export const adjustItem = (state, { item }) => {
  // change cart item quantity 
  const {productId, quantity, price} = item;
  const items = state.items.map( item => 
    item.productId === productId 
    ? item.set('quantity', quantity).set('price', price)
    : item)
    const sumQuantity = getSumQuantity(items);
    const itemCount = sumQuantity > 99 ? 99 : sumQuantity;
    const totalPrice = getSumPrice(items);
    return state.merge({ items, itemCount, totalPrice });
}

export const removeItem = (state, { productId }) => {
  // remove item from cart
  const items = state.items.filter( item => item.productId !== productId);
  const sumQuantity = getSumQuantity(items);
  const itemCount = sumQuantity > 99 ? 99 : sumQuantity;
  const totalPrice = getSumPrice(items);
  return state.merge({ items, itemCount, totalPrice });
}

export const clear = (state) => INITIAL_STATE

const getSumQuantity = (items) => {
  // get sum quantity of all items in cart
  return items.map(item => item.quantity).reduce((sum, quantity) => sum + quantity, 0);
}

const getSumPrice = (items) => {
  // get total price
  return items.map(item => item.price).reduce((sum, price) => sum + price, 0);
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {  
  [Types.ADD_ITEM]: addItem,
  [Types.ADJUST_ITEM]: adjustItem,
  [Types.REMOVE_ITEM]: removeItem,
  [Types.CLEAR]: clear,
})
