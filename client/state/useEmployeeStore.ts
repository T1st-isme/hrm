// src/state/useEmployeeStore.ts
import { create } from 'zustand';
import { getEmployees, createEmployee, updateEmployee, getEmployeeById } from '@/services/employee.service';

interface Department {
    id: string;
    name: string;
    image?: string | null;
    description?: string | null;
}

interface Employee {
    id?: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    profilePicture?: string;
    dateOfBirth?: string;
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
    addEmployee: (employee: Employee) => Promise<void>;
    getEmployeeById: (id: string) => Promise<void>;
    updateEmployee: (id: string, employee: Employee) => Promise<void>;
    // deleteEmployee: (id: string) => Promise<void>;
    openDialog: () => void;
    closeDialog: () => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
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
        const employee = await getEmployeeById(id);
        set((state) => {
            if (state.employee && state.employee.id === id) {
                return state; // Another check in case it was fetched while this request was in flight
            }
            return { employee, loading: false };
        });
    } catch (error) {
        set({ error: 'Failed to fetch employee' + error, loading: false });
    }
},

  fetchEmployees: async () => {
    set({ loading: true, error: null });
    try {
      const employees = await getEmployees();
      set({ employees, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch employees' + error, loading: false });
    }
  },

  addEmployee: async (employeeData) => {
    set({ loading: true, error: null });
    try {
        const newEmployee = await createEmployee(employeeData);
        set((state) => ({
            employees: [...state.employees, newEmployee],
            loading: false,
        }));
    } catch (error) {
        set({ error: 'Failed to add employee' + error, loading: false });
    }
},

  updateEmployee: async (id: string, employeeData: Employee) => {
    set({ loading: true, error: null });
    try {
        const updatedEmployee = await updateEmployee(id, employeeData);
        set((state) => ({
            employees: state.employees.map((employee) => employee.id === updatedEmployee.id ? updatedEmployee : employee),
            loading: false,
        }));
    } catch (error) {
      set({ error: 'Failed to update employee' + error, loading: false });
    }
  },

  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false }),
}));
