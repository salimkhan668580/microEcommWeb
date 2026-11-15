import { api } from "@/src/helper/Axios";

export interface CategoryItem {
    _id: string;
    name: string;
    slug: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface GetCategoriesResponse {
    categories: CategoryItem[];
}

export interface CreateCategoryPayload {
    name: string;
    slug: string;
    isActive?: boolean;
}

export interface UpdateCategoryPayload {
    name?: string;
    slug?: string;
    isActive?: boolean;
}

class CategoryService {
    /**
     * Fetch all categories
     * GET /users/admin/categories
     */
    async getCategories(): Promise<GetCategoriesResponse> {
        return await api.get<GetCategoriesResponse>("/products/admin/categories");
    }

    /**
     * Create a new category
     * POST /users/admin/categories
     */
    async createCategory(payload: CreateCategoryPayload): Promise<any> {
        return await api.post("/products/admin/categories", payload);
    }

    /**
     * Update category
     * PUT /users/admin/categories/:id
     */
    async updateCategory(id: string, payload: UpdateCategoryPayload): Promise<any> {
        return await api.patch(`/products/admin/categories/${id}`, payload);
    }

    /**
     * Delete category
     * DELETE /users/admin/categories/:id
     */
    async deleteCategory(id: string): Promise<any> {
        return await api.delete(`/products/admin/categories/${id}`);
    }
}

export const categoryService = new CategoryService();
export default categoryService;

