import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Product from "../../types/Product";
import PaginationQuery from "../../types/PaginationQuery";
import axios, { AxiosError } from "axios";
import CreateProductInput from "../../types/CreateProductInput";
import UpdateProductInput from "../../types/UpdateProductInput";

export const initialState: {    
    products: Product[]
    error?: string
    loading: boolean
} = {
    products: [],
    loading: false
}

export const fetchAllProductAsync = createAsyncThunk(
    'fetchAllProductAsync',
    async ({ limit, offset }: PaginationQuery) => {
        try {
            const jsonData = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`) 
            const data: Product[] = await jsonData.json()
            return data
        } catch (e) {
            const error = e as Error
            return error
        }
    }
)

export const createProductAsync = createAsyncThunk(
    'createProductAsync',
    async (newProduct: CreateProductInput, { rejectWithValue }) => {
        try {
            const result = await axios.post<Product>('https://api.escuelajs.co/api/v1/products/', newProduct)
            return result.data
        }
        catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const deleteProductAsync = createAsyncThunk(
    'deleteProductAsync',
    async (id:number) => {
        try {
            const result = await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`) 
            if (!result.data){
                throw new Error("Cannot delete")
            } 
            return id
        }
        catch (e) {
            const error = e as Error
            return error.message
        }
    }
) 
export const updateProductAsync = createAsyncThunk(
    'updateProductAsync',
    async ({ id, update }: UpdateProductInput, { rejectWithValue }) => {
        try {
            const result = await axios.put<Product>(`https://api.escuelajs.co/api/v1/products/${id}`, update)
            return result.data
        }
        catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const getOneProduct = createAsyncThunk<Product, number, { rejectValue: string }>(
    'getOneProduct',
    async (id: number, {rejectWithValue}) => {
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
            const product = response.data;
            return product;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.message);
        }
    }
)

const productsSlice = createSlice(
    {
        name: 'products',
        initialState,
        reducers: {
            addOne: (state, action: PayloadAction<Product>) => {
               state.products.push(action.payload)                
            }, //not needed now we can delete at end
            // removeProduct: (state, action: PayloadAction<string>) => {
            //     const foundIndex = state.products.findIndex(p => p.id === action.payload)
            //     state.products.splice(foundIndex, 1)
            // },//not needed now we can delete at end
            sortByPrice:(state, action:PayloadAction<'asc'|'desc'>)=> {
                //state.sort()
                if(action.payload === 'asc'){
                    state.products.sort((a,b)=>a.price - b.price)
                } else {
                    state.products.sort((a,b)=>b.price - a.price) 
                }
            },  
            setUpState:(state, action:PayloadAction<Product[]>)=>{
                return {
                    ...state,
                    products: action.payload
                }
            }   
        },
        extraReducers: (builder) => {
            builder.addCase(fetchAllProductAsync.fulfilled, (state, action) => {  
                if (!(action.payload instanceof Error)) {
                    return {
                        ...state,
                        products: action.payload,
                        loading: false
                    }
                }
            })
            builder.addCase(fetchAllProductAsync.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            builder.addCase(fetchAllProductAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.message
                    }
                }
            })
            builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
                if(typeof action.payload === "number"){
                    state.products = state.products.filter(p=> p.id !== action.payload)
                }
            })
            builder.addCase(createProductAsync.fulfilled, (state, action) => {
                state.products.push(action.payload)
            })
            builder.addCase(createProductAsync.rejected, (state, action) => {
                state.error = action.payload as string
            })
            builder.addCase(updateProductAsync.fulfilled, (state, action) => {
                const foundIndex = state.products.findIndex(p => p.id === action.payload.id)
                if (foundIndex >= 0) {
                    state.products[foundIndex] = action.payload
                }
            }) 
        }
    }
) 

const productReducer = productsSlice.reducer // contain current value of property 'productReducer' in global state
export const { addOne,sortByPrice,setUpState} = productsSlice.actions
//export const { addOne, removeProduct, sortByPrice,setUpState} = productsSlice.actions
export default productReducer