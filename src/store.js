import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers, productDetailsReducers, productDeleteReducers, productCreateReducers, productUpdateReducers, productReviewCreateReducers } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers' 
import { userLoginReducers, userRegisterReducers, userDetailsReducers, userUpdateProfileReducers, userListReducers, userDeleteReducer, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productDelete: productDeleteReducers,
    productCreate:productCreateReducers,
    productUpdate:productUpdateReducers,
    productReviewCreate:productReviewCreateReducers,


    cart: cartReducer,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    userList:userListReducers,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,

    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliverReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer,
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null  
        
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
        JSON.parse(localStorage.getItem('shippingAddress')) : {}         

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress:shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;