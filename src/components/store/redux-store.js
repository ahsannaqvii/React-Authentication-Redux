
import { configureStore } from "@reduxjs/toolkit";
import UIReducer from './ui-slice'
import CartReducer from './cart-slice'
const store=configureStore({
    reducer:{
        ui:UIReducer , cart:CartReducer
    }
})
export default store;