import axios, { InternalAxiosRequestConfig } from 'axios'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper'

export const instance = axios.create({
	baseURL: process.env.BASE_URL,
	headers: {
		Authorization: `Bearer ${getTokenFromLocalStorage() || ''}`,
	},
})

instance.interceptors.request.use(
	async (requestConfig: InternalAxiosRequestConfig) => {
		requestConfig.headers['Authorization'] =
			`Bearer ${getTokenFromLocalStorage() || ''}`
		return requestConfig
	},
)
