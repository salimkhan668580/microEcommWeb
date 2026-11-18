import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
    AxiosError,
} from "axios";

// Retrieve API Base URL from environment variables
export const API_BASE_URL: string =
    process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

/**
 * Pre-configured Axios instance
 */
const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Helper to extract a cookie by name if token is stored in cookie
const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
    return match ? decodeURIComponent(match[3]) : null;
};

/**
 * Request Interceptor
 * - Injects Bearer token from localStorage or Cookie
 */
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const fullUrl = (config.baseURL || "") + (config.url || "");
        const method = (config.method || "get").toUpperCase();
        console.log(`[Axios Request] 🚀 ${method} ${fullUrl}`, {
            data: config.data,
            params: config.params,
        });

        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token") || getCookie("token");

            if (token) {
                if (!config.headers) {
                    config.headers = {} as any;
                }
                config.headers["Authorization"] = `Bearer ${token}`;
                console.log("Authorization: ", config.headers["Authorization"])
                if (typeof (config.headers as any).set === "function") {
                    (config.headers as any).set("Authorization", `Bearer ${token}`);
                }
            }
        }

        if (config.data instanceof FormData && config.headers) {
            if (typeof (config.headers as any).delete === "function") {
                (config.headers as any).delete("Content-Type");
            } else {
                delete config.headers["Content-Type"];
            }
        }

        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        console.error("[Axios Request Error]", error);
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        const fullUrl = (response.config.baseURL || "") + (response.config.url || "");
        const method = (response.config.method || "get").toUpperCase();

        console.log(`[Axios Response] ✅ ${response.status} ${method} ${fullUrl}`, {
            headers: response.config.headers,
            data: response.data,
        });

        return response;
    },
    (error: AxiosError<{ message?: string; error?: string }>): Promise<never> => {
        const fullUrl = (error.config?.baseURL || "") + (error.config?.url || "");
        const method = (error.config?.method || "get").toUpperCase();

        console.error(`[Axios Response Error] ❌ ${error.response?.status || "NO_RESPONSE"} ${method} ${fullUrl}`, {
            message: error.message,
            headers: error.config?.headers,
            authHeader: error.config?.headers?.Authorization,
            data: error.response?.data,
        });

        if (error.response?.status === 401) {
            console.warn("Unauthorized (401): Please login to continue.");
        }

        return Promise.reject(error);
    }
);

/**
 * Helper to dynamically set or remove Authorization token
 */
export const setAuthToken = (token: string | null): void => {
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        if (typeof window !== "undefined") {
            localStorage.setItem("token", token);
            document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
        }
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
        }
    }
};

/**
 * Convenient API Methods
 */
export const api = {
    get: <T = any>(url: string, config?: InternalAxiosRequestConfig) =>
        axiosInstance.get<T>(url, config).then((res) => res.data),

    post: <T = any>(
        url: string,
        data?: any,
        config?: InternalAxiosRequestConfig
    ) => axiosInstance.post<T>(url, data, config).then((res) => res.data),

    put: <T = any>(
        url: string,
        data?: any,
        config?: InternalAxiosRequestConfig
    ) => axiosInstance.put<T>(url, data, config).then((res) => res.data),

    patch: <T = any>(
        url: string,
        data?: any,
        config?: InternalAxiosRequestConfig
    ) => axiosInstance.patch<T>(url, data, config).then((res) => res.data),

    delete: <T = any>(url: string, config?: InternalAxiosRequestConfig) =>
        axiosInstance.delete<T>(url, config).then((res) => res.data),
};

export { axiosInstance, axiosInstance as apiClient };
export default axiosInstance;
