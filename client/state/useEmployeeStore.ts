// src/state/useEmployeeStore.ts
import { create } from "zustand";
import {
    getEmployees,
    createEmployee,
    updateEmployee,
    getEmployeeById,
} from "@/services/employee.service";

interface Department {
    id: string;
    name: string;
}

interface Employee {
    id?: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    profilePicture?: string;
    dateOfBirth: string;
    email: string;
    password: string;
    address: string;
    contactNumber: string;
    jobTitle: string;
    departmentId: string;
    employmentStartDate?: string;
    salary?: number | null;
    createdAt?: string;
    updatedAt?: string;
    department?: Department;
}

interface EmployeeStore {
    employees: Employee[];
    loading: boolean;
    error: string | null;
    isDialogOpen: boolean;
    employee: Employee | null;

    fetchEmployees: () => Promise<void>;
    addEmployee: (
        employee: Employee,
        profilePicture: File | string | null
    ) => Promise<void>;
    getEmployeeById: (id: string) => Promise<void>;
    updateEmployee: (id: string, employee: Employee, profilePicture: File | string | null) => Promise<void>;
    // deleteEmployee: (id: string) => Promise<void>;
    openDialog: () => void;
    closeDialog: () => void;
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
    employees: [],
    loading: false,
    error: null,
    isDialogOpen: false,
    employee: null,

    getEmployeeById: async (id: string) => {
        set((state) => {
            if (state.employee && state.employee.id === id) {
                return state; // No need to fetch if we already have the employee
            }
            return { loading: true, error: null };
        });
        try {
            const res = await getEmployeeById(id);
            if (res.success) {
            set((state) => {
                if (state.employee && state.employee.id === id) {
                    return state; // Another check in case it was fetched while this request was in flight
                }
                return { employee: res.result, loading: false };
            });
            }
        } catch (error) {
            set({ error: "Failed to fetch employee" + error, loading: false });
        }
    },

    fetchEmployees: async () => {
        set({ loading: true, error: null });
        try {
            const res = await getEmployees();
            if (res.success) {
                if (res.result.length > 0) {
                    set({ employees: res.result, loading: false });
                } else {
                    set({ employees: [], loading: false });
                }
            }
        } catch (error) {
            set({ error: "Failed to fetch employees" + error, loading: false });
        }
    },

    addEmployee: async (
        employeeData: Employee,
        profilePicture: File | string | null
    ) => {
        set({ loading: true, error: null });
        try {
            // Create FormData and append fields
            const formData = new FormData();
            formData.append("firstName", employeeData.firstName);
            formData.append("lastName", employeeData.lastName);
            formData.append("email", employeeData.email);
            formData.append("dateOfBirth", employeeData.dateOfBirth);
            formData.append("password", employeeData.password);
            formData.append("address", employeeData.address);
            formData.append("contactNumber", employeeData.contactNumber);
            formData.append("jobTitle", employeeData.jobTitle);
            formData.append("departmentId", employeeData.departmentId);

            if (profilePicture) {
                formData.append("profilePicture", profilePicture);
            }

            const newEmployee = await createEmployee(formData);
            if (newEmployee.success) {
                set(() => ({
                    employees: [...get().employees, newEmployee.result],
                    loading: false,
                }));
            }
            else {
                set({ error: "Failed to add employee" + newEmployee.error, loading: false });
            }
        } catch (error) {
            set({ error: "Failed to add employee" + error, loading: false });
        }
    },

    updateEmployee: async (
        id: string,
        employeeData: Employee,
        profilePicture: File | string | null
    ) => {
        set({ loading: true, error: null });
        try {
            // Create FormData for update
          const formData = new FormData();
          formData.append('firstName', employeeData.firstName);
          formData.append('lastName', employeeData.lastName);
          formData.append('email', employeeData.email);
          formData.append('dateOfBirth', employeeData.dateOfBirth);
          formData.append('password', employeeData.password);
          formData.append('address', employeeData.address);
          formData.append('contactNumber', employeeData.contactNumber);
          formData.append('jobTitle', employeeData.jobTitle);
          formData.append('departmentId', employeeData.departmentId);

          if (profilePicture) {
            formData.append('profilePicture', profilePicture);
          }

          const updatedEmployee = await updateEmployee(id, formData);
            if (updatedEmployee.success) {
                set({
                    employees: get().employees.map((employee) =>
                        employee.id === id ? updatedEmployee.result : employee
                    ),
                    loading: false,
                });
                set({ employee: updatedEmployee.result });
            }
            else {
                set({ error: "Failed to update employee" + updatedEmployee.error, loading: false });
            }
        } catch (error) {
            set({ error: "Failed to update employee" + error, loading: false });
        }
    },

    openDialog: () => set({ isDialogOpen: true }),
    closeDialog: () => set({ isDialogOpen: false }),
}));
