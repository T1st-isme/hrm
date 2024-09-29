import { create } from "zustand";
import {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentById,
} from "../services/department.service";
interface Department {
    id?: string;
    name: string;
    description: string;
    image: string;
}

interface DepartmentStore {
    departments: Department[];
    loading: boolean;
    error: string | null;
    isDialogOpen: boolean;
    department: Department | null;

    fetchDepartments: () => Promise<void>;
    getDepartmentById: (id: string) => Promise<void>;
    addDepartment: (department: Department) => Promise<void>;
    updateDepartment: (id: string, department: Department) => Promise<void>;
    deleteDepartment: (id: string) => Promise<void>;
    openDialog: () => void;
    closeDialog: () => void;
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
    departments: [],
    loading: false,
    error: null,
    isDialogOpen: false,
    department: null,

    fetchDepartments: async () => {
        set({ loading: true, error: null });
        try {
            const res = await getDepartments();
            if (res.success) {
                set((state) => {
                    if (state.departments.length > 0) {
                        return state;
                    }
                    return { departments: res.result, loading: false };
                });
            }
        } catch (error) {
            set({
                error: "Failed to fetch departments" + error,
                loading: false,
            });
        } finally {
            set({ loading: false });
        }
    },

    getDepartmentById: async (id: string) => {
        set((state) => {
            if (state.department && state.department.id === id) {
                return state; // No need to fetch if we already have the employee
            }
            return { loading: true, error: null };
        });
        try {
            const res = await getDepartmentById(id);
            if (res.success) {
                set((state) => {
                    if (state.department && state.department.id === id) {
                        return state;
                    }
                    return { department: res.result, loading: false };
                });
            }
        } catch (error) {
            set({ error: "Failed to fetch employee" + error, loading: false });
        }
    },

    addDepartment: async (department: Department) => {
        set({ loading: true, error: null });
        try {
            const newDepartment = await createDepartment(department);
            if (newDepartment.success) {
                set((state) => ({
                    departments: [...state.departments, newDepartment.result],
                }));
            } else {
                set({ error: newDepartment.message, loading: false });
            }
        } catch (error) {
            set({ error: error as string });
        } finally {
            set({ loading: false });
        }
    },
    updateDepartment: async (id: string, department: Department) => {
        set({ loading: true, error: null });
        try {
            const updatedDepartment = await updateDepartment(id, department);
            if (updatedDepartment.success) {
                set((state) => ({
                    departments: state.departments.map((d) =>
                        d.id === id ? updatedDepartment : d
                    ),
                }));
            } else {
                set({ error: updatedDepartment.message, loading: false });
            }
        } catch (error) {
            set({ error: error as string });
        } finally {
            set({ loading: false });
        }
    },
    deleteDepartment: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await deleteDepartment(id);
            set((state) => ({
                departments: state.departments.filter((d) => d.id !== id),
            }));
        } catch (error) {
            set({ error: error as string });
        } finally {
            set({ loading: false });
        }
    },
    openDialog: () => set({ isDialogOpen: true }),
    closeDialog: () => set({ isDialogOpen: false }),
}));
