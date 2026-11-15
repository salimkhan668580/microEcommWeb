import { api } from "@/src/helper/Axios";
import { UserData } from "@/src/types/auth";

export interface UserProfileResponse {
    user: UserData;
    message?: string;
}

export interface EditProfilePayload {
    name: string;
    email: string;
    phone: string;
}

class UserProfileService {
    /**
     * Fetch current authenticated user details
     * GET /users/me
     */
    async getProfile(): Promise<UserProfileResponse> {
        return await api.get<UserProfileResponse>("/users/me");
    }

    /**
     * Edit user profile details
     * Method: PATCH
     * Endpoint: /users/me
     * Payload: { name, email, phone }
     */
    async updateProfile(data: EditProfilePayload): Promise<UserProfileResponse> {
        const response = await api.patch<UserProfileResponse>("/users/me", data);

        // Sync updated user data with localStorage
        if (response?.user && typeof window !== "undefined") {
            const existingUser = localStorage.getItem("user");
            const updated = existingUser
                ? { ...JSON.parse(existingUser), ...response.user }
                : response.user;
            localStorage.setItem("user", JSON.stringify(updated));
        }

        return response;
    }
}

export const userProfileService = new UserProfileService();
export default userProfileService;
