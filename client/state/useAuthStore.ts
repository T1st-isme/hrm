import Cookies from 'js-cookie';
import { login } from "@/services/auth.service";
import { create } from "zustand";
import { getEmployeeById } from "@/services/employee.service";
import { jwtDecode } from "jwt-decode";
interface User {
    id?: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    department?: string;
    roles?: Role;
    profilePicture?: string;
}

interface Role {
    name: string;
}

interface AuthStore {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (user: User) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    loading: false,
    error: null,

    login: async (user: User) => {
        set({ loading: true, error: null });
        try {
            const response = await login(user);
            if (response.success) {
                // Cookies.set("token", response.access_token, { path: "/" });
                // console.log("response.access_token", response.access_token);
                // console.log("Token set:", Cookies.get("token"));
                set({ user: response.user, loading: false });
            } else {
                set({ error: "Login failed", loading: false });
            }
        } catch (error) {
            set({
                error: (error as string) || "An error occurred",
                loading: false,
            });
        }
    },
    logout: () => {
        Cookies.remove("jwt");
        set({ user: null, loading: false });
    },

    checkAuth: async () => {
        const token = Cookies.get("jwt");

        if (token) {
            try {
                const decodedUser = jwtDecode<User>(token);
                console.log("decodedUser", decodedUser);
                set({ user: decodedUser });
                const response = await getEmployeeById(
                    decodedUser.id as string
                );
                console.log("Employee ID:", decodedUser.id);
                if (response.success) {
                    set({ user: response.result });
                } else {
                    set({ error: "Failed to fetch user data" });
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                set({ error: "Invalid token", user: null });
                Cookies.remove("jwt");
            }
        } else {
            console.log("No token found");
            set({ user: null });
        }
    },
}));
