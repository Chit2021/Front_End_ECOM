import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import User from "../../types/User";
import UsersReducerState from "../../types/UsersReducerState";
import { UserCredentials } from "../../types/UserCredentials";
import { NewUser } from "../../types/NewUser";
import { UserUpdateParams } from "../../types/UserUpdate";
import { RoleUpdateParams } from "../../types/RoleUpdate";
import { JWTPair } from "../../types/JwtPair";

//const initialState: User[] = []
const initialState: UsersReducerState = {
    users: []
}

export const fetchUsersAsync = createAsyncThunk<User[], void, { rejectValue: string }>(
    'fetchUsersAsync',
    async (_, { rejectWithValue }) => {
        try {
            const result = await axios.get('https://api.escuelajs.co/api/v1/users')
            return result.data
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)
// export const loginUserAsync = createAsyncThunk<User, UserCredentials, { rejectValue: string }>(
export const loginUserAsync = createAsyncThunk<JWTPair, UserCredentials, { rejectValue: string }>(
    'loginUserAsync',
    async (cred, { rejectWithValue}) => {
    // async (cred, { rejectWithValue, dispatch }) => {
        // try {
        //     const result = await axios.post('https://api.escuelajs.co/api/v1/auth/login', cred)
        //     const { access_token } = result.data
        //     const authenticatedResult = await dispatch(authenticateUserAsync(access_token))
        //     if (typeof authenticatedResult.payload === "string" || !authenticatedResult.payload) {
        //         throw Error(authenticatedResult.payload || "Cannot login")
        //     } else {
        //         // localStorage.setItem("access_token", access_token)
        //         return authenticatedResult.payload as User
        //     }
        // }
        // catch (e) {
        //     const error = e as Error
        //     return rejectWithValue(error.message)
        // } //runs with test
        try {
            const result = await axios.post(`https://api.escuelajs.co/api/v1/auth/login`, cred);
            if (typeof result.data === 'string') {
              throw new Error('User was not authenticated');
            }
            return result.data;
          } catch (err) {
            const error = err as AxiosError;
            return rejectWithValue(error.message)
          }
    }//tried with jwt
)

export const authenticateUserAsync = createAsyncThunk<User, string, { rejectValue: string }>(
    "authenticateUserAsync",
    async (access_token, { rejectWithValue }) => {
        try {
            const get_profile = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            return get_profile.data
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

export const createUserAsync = createAsyncThunk(
    "createUserAsync",
    async (user : NewUser, { rejectWithValue }) => {
        try {
            const response = await axios.post<User>(`https://api.escuelajs.co/api/v1/users/`, user)
            if (!response.data) {
                throw new Error("Could not add user")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }            
    }
)

export const deleteUserAsync = createAsyncThunk(
    "deleteUserAsync",
    async (id : number, { rejectWithValue }) => {
        try {
            const response = await axios.delete<boolean>(`https://api.escuelajs.co/api/v1/users/${id}`)
            if (!response.data) {
                throw new Error("Could not delete user")
            }
            return id
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

export const updateUserAsync = createAsyncThunk(
    "updateUserAsync",
    async (params : UserUpdateParams, { rejectWithValue }) => {
        try {
            const response = await axios.put<User>(`https://api.escuelajs.co/api/v1/users/${params.id}`,params.update)
            if (!response.data.name) {
                throw new Error("Could not update user")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

export const updateUserRoleAsync = createAsyncThunk(
    "updateUserRoleAsync",
    async (params : RoleUpdateParams, { rejectWithValue }) => {
        try {
            const response = await axios.put<User>(`https://api.escuelajs.co/api/v1/users/${params.id}`,{ "role" : params.role })
            if (!response.data.name) {
                throw new Error("Could not update user role")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers: {
        // addOne : (state, action: PayloadAction<User>) => {
        //     state.push(action.payload)
        // }
        logout: (state, action: PayloadAction) =>
        state = initialState 
    },
    extraReducers: (builder) => {
         builder
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(fetchUsersAsync.rejected, (state, action) => {
                state.error = action.payload
            })
            // .addCase(loginUserAsync.fulfilled, (state, action) => {
            //     console.log("user reducer fulfilled: ", action.payload)
            //     state.currentUser = action.payload
            // })
            .addCase(loginUserAsync.rejected, (state, action) => {
                console.log("user reducer rejected: ", action.payload)
                state.error = action.payload
            })
            .addCase(authenticateUserAsync.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(authenticateUserAsync.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(createUserAsync.fulfilled, (state, action : PayloadAction<User>) => {
                state.users.push(action.payload)
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.error = action.payload as string
            })
            .addCase(deleteUserAsync.fulfilled, (state, action : PayloadAction<number>) => {
                state.users = state.users.filter(p => p.id !== action.payload)
            })
            .addCase(deleteUserAsync.rejected, (state, action) => {
                state.error = action.payload as string
            })
            .addCase(updateUserAsync.fulfilled, (state, action : PayloadAction<User>) => {
                state.users.map(p => p.id === action.payload.id ? action.payload : p)
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.error = action.payload as string
            })
            .addCase(updateUserRoleAsync.fulfilled, (state, action : PayloadAction<User>) => {
                state.users.map(p => p.id === action.payload.id ? action.payload : p)
            })
            .addCase(updateUserRoleAsync.rejected, (state, action) => {
                state.error = action.payload as string
            })
    }
})


const userReducer = userSlice.reducer
export const { logout } = userSlice.actions
export default userReducer