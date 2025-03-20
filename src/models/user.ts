export interface UserModel {
    id: number,
    name: string,
    password?: string,
    email: string,
    role: string
}
  export type CreateUserDto ={
    name: string,
    email: string,
    password: string,
    role: string
  }


