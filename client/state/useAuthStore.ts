import Cookies from 'js-cookie';
import { login as loginService } from "@/services/auth.service";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface User {
    id?: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    department?: string;
    fullName?: string;
    address?: string;
    dateOfBirth?: string;
    contactNumber?: string;
    profilePicture?: string;
    roles?: string[];
    createdAt?: string;
}

interface AuthStore {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (user: User) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
    hasRole: (role: string) => boolean;
}

const isTokenExpired = (token: string): boolean => {
    try {
        const { exp } = jwtDecode<{ exp: number }>(token);
        return exp * 1000 < Date.now();
    } catch (error) {
        console.error("Error decoding token:", error);
        return true;
    }
};

// Function to decode the JWT token and extract user data
const decodeToken = (token: string): User => {
    try {
        return jwtDecode<User>(token);
    } catch (error) {
        console.error("Error decoding token:", error);
        return {} as User;
    }
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    loading: false,
    error: null,

    login: async (user: User) => {
        set({ loading: true, error: null });
        try {
            const response = await loginService(user);
            if (response.success) {
                // Save JWT token in cookies
                Cookies.set("jwt", response.access_token, { path: "/" });

                // Decode the token to get user data
                const decodedUser = decodeToken(response.access_token);

                console.log("Decoded User from Token:", decodedUser);

                // Update the store with the user data
                set({ user: decodedUser, loading: false });
            } else {
                set({ error: response.message || "Login failed", loading: false });
            }
        } catch (error) {
            console.error("Login error:", error);
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            set({ error: errorMessage, loading: false });
        }
    },

    logout: () => {
        Cookies.remove("jwt");
        set({ user: null, loading: false });
    },

    checkAuth: async () => {
        const token = Cookies.get("jwt");

        if (token) {
            if (isTokenExpired(token)) {
                console.warn("Token expired, logging out");
                Cookies.remove("jwt");
                set({ user: null, error: "Session expired" });
                return;
            }

            try {
                // Decode the token to retrieve user information
                const decodedUser = decodeToken(token);

                console.log("Decoded User from CheckAuth:", decodedUser);

                set({ user: decodedUser, loading: false });
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

    // Role check function with explicit return type
    hasRole: (role: string): boolean => {
        const state = useAuthStore.getState();
        return state.user?.roles?.includes(role) ?? false;
    },
}));
