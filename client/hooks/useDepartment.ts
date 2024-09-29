// src/hooks/useDepartment.ts
import { useDepartmentStore } from "@/state/useDepartmentStore";

export const useDepartment = () => {
  const departments = useDepartmentStore((state) => state.departments);
  const department = useDepartmentStore((state) => state.department);
  const fetchDepartments = useDepartmentStore((state) => state.fetchDepartments);
  const getDepartmentById = useDepartmentStore((state) => state.getDepartmentById);
  const addDepartment = useDepartmentStore((state) => state.addDepartment);
  const deleteDepartment = useDepartmentStore((state) => state.deleteDepartment);
  const updateDepartment = useDepartmentStore((state) => state.updateDepartment);
  const loading = useDepartmentStore((state) => state.loading);
  const error = useDepartmentStore((state) => state.error);
  const isDialogOpen = useDepartmentStore((state) => state.isDialogOpen);
  const openDialog = useDepartmentStore((state) => state.openDialog);
  const closeDialog = useDepartmentStore((state) => state.closeDialog);

  return {
    departments,
    department,
    fetchDepartments,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    loading,
    error,
    isDialogOpen,
    openDialog,
    closeDialog,
  };
};
