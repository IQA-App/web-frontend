import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const instance = axios.create({
	baseURL: process.env.BASE_URL,
	headers: {
		Authorization: 'Bearer ' + getTokenFromLocalStorage() || '',
	},
})