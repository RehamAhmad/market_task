import { combineReducers } from 'redux'
const initState = {
    category: [],
    cartProducts: [],
    productsIds: [],
    allProducts: []
}


function reducer(state = initState, action) {

    switch (action.type) {

        case 'ADD_PRODUCT_TO_CART':

            if (state.productsIds.includes(action.payload.id)) {
                var prods = state.cartProducts.filter(pd => pd.id != action.payload.id);
                var ids = state.productsIds.filter(id => id != action.payload.id)
                return { ...state, cartProducts: prods, productsIds: ids }
            } else {
                return {
                    ...state,
                    cartProducts: [...state.cartProducts, action.payload],
                    productsIds: [...state.productsIds, action.payload.id]
                }
            }

        case 'SET_ALL_PRODUCTS':
            return { ...state, allProducts: action.payload }

        default:
            return state;
    }
}

export default combineReducers({
    Category: reducer
})


