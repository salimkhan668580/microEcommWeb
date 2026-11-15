import { api, setAuthToken } from "@/src/helper/Axios";
import {
  LoginPayload,
  UserLoginResponse,
  AdminLoginResponse,
  SignupData,
} from "@/src/types/auth";

class AuthService {
  /**
   * User Signup (/auth/register)
   */
  async signup(data: SignupData) {
    return await api.post("/users/auth/register", data);
  }

  /**
   * User Login (/auth/login)
   * Method: POST
   * Payload: { email, password }
   * Response: { token, user: { id, name, email, phone, role } }
   */
  async userLogin(credentials: LoginPayload): Promise<UserLoginResponse> {
    const response = await api.post<UserLoginResponse>(
      "/users/auth/login",
      credentials
    );

    if (response?.token) {
      setAuthToken(response.token);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }
    }

    return response;
  }

  /**
   * Admin Login (/admin/login)
   * Method: POST
   * Payload: { email, password }
   * Response: { token, admin: { id, name, email, role } }
   */
  async adminLogin(credentials: LoginPayload): Promise<AdminLoginResponse> {
    const response = await api.post<AdminLoginResponse>(
      "/users/admin/login",
      credentials
    );

    if (response?.token) {
      setAuthToken(response.token);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.token);
        localStorage.setItem("admin_token", response.token);
        localStorage.setItem("admin", JSON.stringify(response.admin));
      }
    }

    return response;
  }

  /**
   * Logout and clear saved session
   */
  logout() {
    setAuthToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("admin_token");
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
    }
  }
}

export const authService = new AuthService();
export default authService;
