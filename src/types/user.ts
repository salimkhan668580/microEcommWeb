export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsersPagination {
  page: number;
  limit: number;
  total: number;
}

export interface GetAdminUsersResponse {
  users: AdminUser[];
  pagination: UsersPagination;
}

export interface GetAdminUsersParams {
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface AdminUserStats {
  totalUsers: number;
  totalUsersChangePercent: number;
  blockedUsers: number;
  todayRegistered: number;
  todayRegisteredChangePercent: number;
}

export interface GetAdminUserStatsResponse {
  stats: AdminUserStats;
}

export interface GetAdminUserByIdResponse {
  user: AdminUser;
}

export interface DeleteAdminUserResponse {
  message: string;
}

export interface UpdateAdminUserPayload {
  name: string;
  email: string;
  phone: string;
}

export interface CreateAdminUserPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}
