import { api } from "@/api";
import { URL_MENU } from "@/constants";
import { MenuTypes } from "@/types/Menu.types";

class MenuServices {
  async getMenuRouts(): Promise<MenuTypes[]> {
    const { data } = await api.get(URL_MENU);
    return data || [];
  }
}

export const menuServices = new MenuServices();