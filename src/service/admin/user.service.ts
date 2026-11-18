import { api } from "@/src/helper/Axios";
import type {
  CreateAdminUserPayload,
  DeleteAdminUserResponse,
  GetAdminUserByIdResponse,
  GetAdminUsersParams,
  GetAdminUsersResponse,
  GetAdminUserStatsResponse,
  UpdateAdminUserPayload,
} from "@/src/types/user";

class UserService {
  /**
   * Fetch admin users list
   * GET /users/admin/users
   */
  async getUsers(params: GetAdminUsersParams = {}): Promise<GetAdminUsersResponse> {
    const query: Record<string, string | number | boolean> = {};

    if (typeof params.isActive === "boolean") {
      query.isActive = params.isActive;
    }
    if (params.search?.trim()) {
      query.search = params.search.trim();
    }
    if (params.page != null) {
      query.page = params.page;
    }
    if (params.limit != null) {
      query.limit = params.limit;
    }

    return await api.get<GetAdminUsersResponse>("/users/admin/users", {
      params: query,
    } as any);
  }

  /**
   * Fetch admin user stats
   * GET /users/admin/users/stats
   */
  async getUserStats(): Promise<GetAdminUserStatsResponse> {
    return await api.get<GetAdminUserStatsResponse>("/users/admin/users/stats");
  }

  /**
   * Fetch a single admin user by id
   * GET /users/admin/users/:id
   */
  async getUserById(id: string): Promise<GetAdminUserByIdResponse> {
    return await api.get<GetAdminUserByIdResponse>(`/users/admin/users/${id}`);
  }

  /**
   * Toggle user active/blocked status
   * PATCH /users/admin/users/:id/toggle-status
   */
  async toggleUserStatus(id: string): Promise<GetAdminUserByIdResponse> {
    return await api.patch<GetAdminUserByIdResponse>(
      `/users/admin/users/${id}/toggle-status`
    );
  }

  /**
   * Delete a user
   * DELETE /users/admin/users/:id
   */
  async deleteUser(id: string): Promise<DeleteAdminUserResponse> {
    return await api.delete<DeleteAdminUserResponse>(`/users/admin/users/${id}`);
  }

  /**
   * Update a user
   * PATCH /users/admin/users/:id
   */
  async updateUser(
    id: string,
    payload: UpdateAdminUserPayload
  ): Promise<GetAdminUserByIdResponse> {
    return await api.patch<GetAdminUserByIdResponse>(
      `/users/admin/users/${id}`,
      payload
    );
  }

  /**
   * Create a user
   * POST /users/admin/users
   */
  async createUser(
    payload: CreateAdminUserPayload
  ): Promise<GetAdminUserByIdResponse> {
    return await api.post<GetAdminUserByIdResponse>("/users/admin/users", payload);
  }
}

export const userService = new UserService();
export default userService;
