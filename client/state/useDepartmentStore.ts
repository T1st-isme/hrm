import { create } from 'zustand';
import { getDepartments, createDepartment } from '../services/department.service';
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
    fetchDepartments: () => Promise<void>;
    addDepartment: (department: Department) => Promise<void>;
    openDialog: () => void;
    closeDialog: () => void;
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
    departments: [],
    loading: false,
    error: null,
    isDialogOpen: false,

    fetchDepartments: async () => {
        set((state) => {
            if (state.departments.length > 0) {
                return state;
            }
            return { loading: true, error: null };
        });
        try {
            const departments = await getDepartments();
            set((state) => {
                if (state.departments.length > 0) {
                    return state;
                }
                return { departments, loading: false };
            });
        } catch (error) {
            set({ error: 'Failed to fetch departments' + error, loading: false });
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
    openDialog: () => set({ isDialogOpen: true }),
    closeDialog: () => set({ isDialogOpen: false }),
}));
