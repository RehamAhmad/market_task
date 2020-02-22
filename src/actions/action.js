
export function addProductToCart(data) {
  return { type: 'ADD_PRODUCT_TO_CART', payload: data }
}

export function setAllProducts(products) {
  return { type: 'SET_ALL_PRODUCTS', payload: products }
}

