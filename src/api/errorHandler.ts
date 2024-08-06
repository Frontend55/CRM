import { authService } from "@/services/auth.service";
import { AxiosError } from "axios";

export const errorHandler = async (error: AxiosError) => {
  const { response } = error;
  if (response?.status === 401) {
    await authService.refrashToken();
  }
}