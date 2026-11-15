export interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

export interface AdminData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface UserLoginResponse {
  token: string;
  user: UserData;
  message?: string;
}

export interface AdminLoginResponse {
  token: string;
  admin: AdminData;
  message?: string;
}

export interface SignupData {
  name: string;
  email: string;
  phone?: string;
  password?: string;
}

export interface AuthResponse {
  token?: string;
  user?: UserData;
  admin?: AdminData;
  message?: string;
}
