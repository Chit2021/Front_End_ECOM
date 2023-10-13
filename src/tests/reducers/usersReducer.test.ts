import { jwtFixture } from "../../components/JwtFixture"
import cleanUpState  from "../../redux/reducers/productsReducer"
import { authenticateUserAsync, createUserAsync, deleteUserAsync, fetchUsersAsync, loginUserAsync, updateUserRoleAsync,  } from "../../redux/reducers/usersReducer"
import store from "../../redux/store"
import { JWTPair } from "../../types/JwtPair"
import { NewUser } from "../../types/NewUser"
import { RoleUpdateParams } from "../../types/RoleUpdate"
import usersData from "../data/usersData"
import userServer,{ access_token }  from "../shared/userServer"

afterEach(()=>{
   // store.dispatch(cleanUpState())   //cleaning effect
  })
  
  // afterEach(()=>{
  //   store = createStore()
  // }) // fake
  
  //enable api mocking
  beforeAll(()=> userServer.listen())
  
  //reset any runtime req handlers we may add during tests
  afterEach(()=> userServer.restoreHandlers())
  
  //disable api mocking after test done
  afterAll(()=>userServer.close())

  describe("Test usersReducer async actions", () => {
    test("Should fetch all users", async () => {
        await store.dispatch(fetchUsersAsync())
        expect(store.getState().usersReducer.users.length).toBe(3)
    })
    // test("Should login user with right credential", async () => {
    //     await store.dispatch(loginUserAsync({ email: "john@gmail.com", password: "change1me" }))
    //     expect(store.getState().usersReducer.currentUser).toMatchObject(usersData[0])
    // })
    // test("Should authenticate with right token", async () => {
    //     await store.dispatch(authenticateUserAsync(access_token + "_2"))
    //     expect(store.getState().usersReducer.currentUser).toMatchObject(usersData[1])
    // }) 
    //It runs correctly for previous code
    test("Should return user by jwt", async () => {
        const response = await store.dispatch(loginUserAsync({email: usersData[0].email, password: usersData[0].password }));
        const checkUser = response.payload as JWTPair;
        expect(Number(checkUser.access_token.split('_')[1])).toBe(usersData[0].id);
      })
    
      test("Should authenticate with right token", async () => {
        const response = await store.dispatch(authenticateUserAsync(jwtFixture.access_token + "_2"));
        expect(response.payload).toMatchObject(usersData[1])
      }) //runs correctly using jwt pair
    test("should create user", async () => {
        const input: NewUser = {
            name: "Chitra",
            email: "abcc@gmail.com",
            password: "abc",
            role:"customer",
            avatar: "https://picsum.photos/id/306/640/640"
        }
        await store.dispatch(createUserAsync(input))
        expect(store.getState().usersReducer.users.length).toBe(4)
     })
     test('should delete existing user', async () => {
        const result = await store.dispatch(deleteUserAsync(1))
        //console.log("User deleted")
        expect(result.payload).toBe(1)
    })
     test('should update user role', async () => {
        const updateParams : RoleUpdateParams = {
            id: 2,
            role: "admin"
        }
        const result = await store.dispatch(updateUserRoleAsync(updateParams))
        expect(result.payload).toMatchObject({
                id: 2,
                email: "maria@mail.com",
                name: "maria",
                role: "admin",
                avatar: "https://i.imur.com",
        })
        console.log("user Updated",result)
    })
})