import { get, post } from "./index";
import { IUser, UserLoginData, UserRegisterData } from "@/interfaces/auth";

interface RegisterAndLoginResponse {
  data: {
    name?: string;
    email?: string;
    token?: {
      access_token: string;
      refresh_token?: string;
    };
    error?: string;
  };
  success: boolean;
}

class AuthApi {
  static async getUserProfile() {
    return get<IUser>("/auth/profile");
  }

  static async login(data: UserLoginData): Promise<RegisterAndLoginResponse> {
    const payload = {
      email: data.email,
      password: data.password,
    };

    return post("/auth/signin", payload);
  }

  static async register(
    data: UserRegisterData
  ): Promise<RegisterAndLoginResponse> {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    return post("/auth/signup", payload);
  }
}

export default AuthApi;
