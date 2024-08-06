import { BASE_URL } from "@/constants";
import axios from "axios";
import { Cookies } from "react-cookie";

export const cookies = new Cookies();

export const getToken = () => {
  return cookies.get('access_token');
}

export const setToken = (value: string | null) => {
  cookies.set('access_token', value)
}

export const update = () => {
  api.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
}

const instanse = axios.create({
  baseURL: BASE_URL,
});

instanse.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${getToken()}`;
  return config
});

export const api = instanse;