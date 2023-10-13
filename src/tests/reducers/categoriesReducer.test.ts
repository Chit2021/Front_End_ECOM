//categoriesReducer.test.ts

import { fetchAllCategories } from "../../redux/reducers/categoriesReducer";
import store from "../../redux/store"
import categoryServer from "../shared/categoryServer";


// beforeEach(() => {store = createStore()})

//enable api mocking
beforeAll(()=> categoryServer.listen())
  
//reset any runtime req handlers we may add during tests
afterEach(()=> categoryServer.restoreHandlers())

//disable api mocking after test done
afterAll(()=>categoryServer.close())


describe('Categories reducer', () => {
    test('should have empty initial state', () => {
        expect(store.getState().categoriesReducer.categories).toMatchObject([])
    })
    test('should not be empty after fetching', async () => {
        await store.dispatch(fetchAllCategories())
        expect(store.getState().categoriesReducer.categories.length).toBeGreaterThan(0)
    })
    test('should get all categories into store', async () => {
        const apiCategories = await store.dispatch(fetchAllCategories())
        const stateCategories = store.getState().categoriesReducer.categories
        expect(stateCategories.length).toBe(apiCategories.payload.length)
    })
})