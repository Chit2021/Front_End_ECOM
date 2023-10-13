export type UserRole = "customer" | "admin"

export interface RoleUpdateParams {
    id: number
    role: UserRole
}