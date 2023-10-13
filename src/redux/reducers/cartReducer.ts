
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartItem from "../../types/CartItem";
import Product from "../../types/Product";

const initialState: CartItem[] = []

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addToCart : (state, action: PayloadAction<Product>) => {
            const cartItem : CartItem = {...action.payload, quantity:1 } //sets default quantity as 1
            const foundIndex = state.findIndex(item => item.id === action.payload.id)
            if(foundIndex !== -1){
                state[foundIndex].quantity ++   //if added same product again
            }else {
                state.push(cartItem) 
            }
        },
        deleteFromCart: (state, action: PayloadAction<number>) => {
            const foundIndex = state.findIndex(item => item.id === action.payload)
            if (foundIndex >= -1) {
              state.splice(foundIndex, 1);
            }
        },
        increaseQuantity:(state, action: PayloadAction<number>) => {
            const foundIndex = state.findIndex(item => item.id === action.payload)
            if (foundIndex >= -1) {
              state[foundIndex].quantity++
            }
        },
        decreaseQuantity:(state, action: PayloadAction<number>) => {
            const foundIndex = state.findIndex(item => item.id === action.payload)
            if (foundIndex >= -1) {
                if(state[foundIndex].quantity === 1){
                    state.splice(foundIndex,1)
                }else{
                    state[foundIndex].quantity--
                }
              
            }
        },      
        emptyCart: (state) => {
            return initialState
        }
       
    }
})

const cartReducer = cartSlice.reducer
export const { addToCart,deleteFromCart,increaseQuantity,decreaseQuantity,emptyCart } = cartSlice.actions
export default cartReducer