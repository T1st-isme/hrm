// src/hooks/useDepartment.ts
import { useDepartmentStore } from '@/state/useDepartmentStore';

export const useDepartment = () => {
  const departments = useDepartmentStore((state) => state.departments);
  const fetchDepartments = useDepartmentStore((state) => state.fetchDepartments);
  const addDepartment = useDepartmentStore((state) => state.addDepartment);
  const loading = useDepartmentStore((state) => state.loading);
  const error = useDepartmentStore((state) => state.error);
  const isDialogOpen = useDepartmentStore((state) => state.isDialogOpen);
  const openDialog = useDepartmentStore((state) => state.openDialog);
  const closeDialog = useDepartmentStore((state) => state.closeDialog);

  return {
    departments,
    fetchDepartments,
    addDepartment,
    loading,
    error,
    isDialogOpen,
    openDialog,
    closeDialog,
  };
};
