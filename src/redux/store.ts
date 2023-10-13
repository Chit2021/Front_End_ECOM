import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";
import CartItem from "../types/CartItem";
import usersReducer from "./reducers/usersReducer";
import categoriesReducer from "./reducers/categoriesReducer";

const preCartReducer: CartItem[] = JSON.parse(localStorage.getItem('cart')|| '[]') 

const store = configureStore({
    reducer: {
        productReducer,
        cartReducer,
        usersReducer,
        categoriesReducer
    },
    //cartreducer should receive data from localstorage so
    preloadedState:{
        cartReducer:preCartReducer
    }
})

const updateLocalStorage = () => {
    const cart = store.getState().cartReducer
    localStorage.setItem('cart',JSON.stringify(cart))
}
//localstorage should be invoked every time when store gets updated so use subscribe method
store.subscribe(updateLocalStorage)

export type AppState = ReturnType<typeof store.getState> //return global states from store
export type AppDispatch = typeof store.dispatch
export default store

