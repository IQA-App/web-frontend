import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const instance = axios.create({
	baseURL: 'https://backapp-dhfngacba4gna8de.eastus-01.azurewebsites.net/api',
	headers: {
		Authorization: 'Bearer ' + getTokenFromLocalStorage() || '',
	},
})