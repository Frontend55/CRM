import { api } from "@/api";
import { URL_USER } from "@/constants";

class UserServices {
  async getUser(): Promise<UserTypes> {
    const { data } = await api.get(URL_USER);
    console.log(data);
    return data
  }
};

export const UserService = new UserServices();