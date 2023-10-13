import User from "./User"

interface UsersReducerState{
    users:User[],
   // users: Partial<User> | undefined
    currentUser?: User,
    error?:string
}
export default UsersReducerState