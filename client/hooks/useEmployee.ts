// src/hooks/useEmployee.ts
import { useEmployeeStore } from '@/state/useEmployeeStore';

export const useEmployee = () => {

  const employees = useEmployeeStore((state) => state.employees);
  const fetchEmployees = useEmployeeStore((state) => state.fetchEmployees);
  const addEmployee = useEmployeeStore((state) => state.addEmployee);
  const getEmployeeById = useEmployeeStore((state) => state.getEmployeeById);
  const updateEmployee = useEmployeeStore((state) => state.updateEmployee);
//   const deleteEmployee = useEmployeeStore((state) => state.deleteEmployee);
  const loading = useEmployeeStore((state) => state.loading);
  const employee = useEmployeeStore((state) => state.employee);
  const error = useEmployeeStore((state) => state.error);
  const totalPages = useEmployeeStore((state) => state.totalPages);
  const isDialogOpen = useEmployeeStore((state) => state.isDialogOpen);
  const openDialog = useEmployeeStore((state) => state.openDialog);
  const closeDialog = useEmployeeStore((state) => state.closeDialog);
  return {
    employees,
    fetchEmployees,
    addEmployee,
    getEmployeeById,
    updateEmployee,
    // deleteEmployee,
    employee,
    loading,
    error,
    isDialogOpen,
    totalPages,
    openDialog,
    closeDialog,
  };
};
