export type Role = "customer"|"admin"

interface User{
    id:number
    name:string
    email:string
    role:Role
    password:string
    avatar:string
}
export default User