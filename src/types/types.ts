export interface IUser {
	id: number
	email: string
	access_token: string
}

export interface IUserData {
	email: string
	password: string
}

export interface IResponseUser {
	email: string | undefined
	id: string | undefined
	createdAt: string | undefined
	updatedAt: string | undefined
	password: string | undefined
}

export interface IResponseUserData {
	token: string
	user: IResponseUser
}

export interface ICategory {
	title: string
	transactions?: []
	createdAt: string
	updatedAt: string
	id: number | string
}

export interface ITransaction {
	title: string
	amount: number
	createdAt: string
	updatedAt: string
	id: number
	type: 'income' | 'expense'
	category: ICategory
}

export interface IResponseTransactionLoader {
	categories: ICategory[]
	transactions: ITransaction[]
	totalIncome: number
	totalExpense: number
}

export type ISortDirection = 'ASC' | 'DESC' | 'UNSORTED'

export interface ISortConfig {
  key: keyof ITransaction
  direction: ISortDirection
}
