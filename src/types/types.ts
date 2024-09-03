export interface IUserData {
  email: string
  password: string
}
export interface IResponseUser {
	email: string | undefined
	id: number | undefined
	createdAt: string | undefined
	updatedAt: string | undefined
	password: string | undefined
}
export interface IResponseUserData {
	token: string | undefined
  user: IResponseUser
}