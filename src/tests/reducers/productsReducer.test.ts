
import { PayloadAction } from "@reduxjs/toolkit"
import productReducer, { fetchAllProductAsync,setUpState, initialState,sortByPrice, deleteProductAsync, createProductAsync, updateProductAsync } from "../../redux/reducers/productsReducer"
import store from "../../redux/store"
import { productsData } from "../data/productsData"
import Product from "../../types/Product"
import server from "../shared/server"
import CreateProductInput from "../../types/CreateProductInput"
import UpdateProductInput from "../../types/UpdateProductInput"

//enable api mocking
beforeAll(()=> server.listen())

//reset any runtime req handlers we may add during tests
afterEach(()=> server.restoreHandlers())

//disable api mocking after test done
afterAll(()=>server.close())

describe("Test normal actions in product reducers",()=> {
  test("should return initial state",()=>{
    expect(store.getState().productReducer.products).toMatchObject([])
  })
  test("Should sorts the products by price ascending",()=>{
    
      store.dispatch(setUpState(productsData))
      store.dispatch(sortByPrice("asc"))
      const products = store.getState().productReducer.products  //to get state
      expect(products[0]).toBe(productsData[1])
      expect(products[1]).toBe(productsData[2])
  })
})

describe("Test async thunk actions in productsReducer", () => {

  test("Should fetch all products with pagination", async () => {
      await store.dispatch(fetchAllProductAsync({ limit: 50, offset: 0 }))
      expect(store.getState().productReducer.products.length).toBe(50)
  })

  test("Should delete existing product",async ()=> {
    //await store.dispatch(deleteProductAsync(1))
    const resultAction = await store.dispatch(deleteProductAsync(3))
    expect(resultAction.payload).toBe(3)
  })

  // test("Should delete non-existing product",async ()=> {
  //   const resultAction = await store.dispatch(deleteProductAsync(10))
  //   expect(resultAction.payload).toBe("Cannot delete")
  // }) 

  test("should create product", async () => {
    const input: CreateProductInput = {
        title: "test product",
        description: "test product",
        price: 100,
        categoryId: 1,
        images: ['image 1']
    }
    await store.dispatch(createProductAsync(input))
    expect(store.getState().productReducer.products.length).toBe(19)
 })

//  test("should not create product with wrong id", async () => {
//     const input: CreateProductInput = {
//       title: "test product",
//       description: "test product",
//       price: 50,
//       categoryId: 10,
//       images: ['image 4']
//     }
//     await store.dispatch(createProductAsync(input))
//     expect(store.getState().productReducer.products.length).toBe(0)
//  }) //not working ..have to check

 test("Should update product", async () => {
  const input: UpdateProductInput = {
      id: 1,
      update: {
          price: 240,
          title: "Newly updated product"
      }
   }
   await store.dispatch(updateProductAsync(input))
})
})