import { api, getToken, setToken } from "@/api";
import { URL_AUTH, URL_LOGIN, URL_LOGOUT, URL_REFRASH, URL_REGISTRATION } from "@/constants";
import { LoginTypes } from "@/types/Login.types";

class AuthService {
  async login(data: LoginTypes) {
    const { data: responseData } = await api.post(URL_LOGIN, data);

    if (responseData) {
      setToken(responseData.token);
    }

    return responseData;
  }
  async registration(data: LoginTypes) {
    return await api.post(URL_REGISTRATION, data)
  }

  async auth() {
    const token = getToken();

    if (!token) {
      return { isAuth: false };
    }

    const { data } = await api.patch(URL_AUTH, { access_token: token });

    return data;
  }

  async logout() {
    setToken(null);
  }

  async refrashToken(): Promise<LoginTypes> {
    const token = getToken();
    const { data: responseData } = await api.patch(URL_REFRASH, token);
    if (responseData) {
      setToken(responseData.token);
    }
    return responseData;
  }
}

export const authService = new AuthService();