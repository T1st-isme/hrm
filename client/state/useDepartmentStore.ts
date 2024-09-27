import { create } from 'zustand';
import { getDepartments, createDepartment, updateDepartment, deleteDepartment, getDepartmentById } from '../services/department.service';
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
    getDepartmentById: (id: string) => Promise<Department | null>;
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
        set((state) => {
            if (state.departments.length > 0) {
                return state;
            }
            return { loading: true, error: null };
        });
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
            set({ error: 'Failed to fetch departments' + error, loading: false });
        } finally {
            set({ loading: false });
        }
    },

    getDepartmentById: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const response = await getDepartmentById(id);
            if (response.success) {
                set({ department: response.result, loading: false });
                return response;
            }
            return null;
        } catch (error) {
            set({ error: error as string });
        } finally {
            set({ loading: false });
        }
    },
    addDepartment: async (department: Department) => {
        set({ loading: true, error: null });
        try {
            const newDepartment = await createDepartment(department);
            set((state) => ({
                departments: [...state.departments, newDepartment],
            }));
        } catch (error) {
            set({ error: error as string });
        } finally {
            set({ loading: false });
        }
    },
    updateDepartment: async (id: string, department: Department) => {
        set({ loading: true, error: null });
        try {
            const updatedDepartment = await updateDepartment(
                id,
                department
            );
            set((state) => ({
                departments: state.departments.map((d) =>
                    d.id === department.id ? updatedDepartment : d
                ),
            }));
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
