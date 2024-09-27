import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomDialog from "@/app/components/Modal/Modal";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDepartment } from "@/hooks/useDepartment";

const formSchema = z.object({
    name: z.string({ required_error: "Department name is required" }),
    description: z.string({ required_error: "Description is required" }),
    image: z.string({ required_error: "Image URL is required" }).url(),
});

export default function EditDepartmentModal({
    isOpen,
    onClose,
    departmentId,
}: {
    isOpen: boolean;
    onClose: () => void;
    departmentId: string;
}) {
    const { getDepartmentById, updateDepartment, department } = useDepartment();
    const [currentDepartmentId, setCurrentDepartmentId] = useState<
        string | null
    >(null);
    const [loading, setLoading] = useState(false);

    const defaultValues = useMemo(
        () => ({
            name: department?.name ?? "",
            description: department?.description ?? "",
            image: department?.image ?? "",
        }),
        [department]
    );

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const memoizedGetDepartmentById = useCallback(() => {
        if (departmentId && departmentId !== currentDepartmentId) {
            getDepartmentById(departmentId);
            setCurrentDepartmentId(departmentId);
        }
    }, [departmentId, getDepartmentById, currentDepartmentId]);

    useEffect(() => {
        if (isOpen) {
            memoizedGetDepartmentById();
        }
    }, [isOpen, memoizedGetDepartmentById]);

    useEffect(() => {
        if (department && department.id === departmentId) {
            form.reset(department);
        }
    }, [department, departmentId, form]);

    const onSubmit = useCallback(
        async (values: z.infer<typeof formSchema>) => {
            setLoading(true);
            try {
                await updateDepartment(departmentId, values);
                onClose();
            } catch (error) {
                console.error("Failed to update department:", error);
            } finally {
                setLoading(false);
            }
        },
        [departmentId, updateDepartment, onClose]
    );

    return (
        <CustomDialog isOpen={isOpen} onClose={onClose} title="Edit Department">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Department Information
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Department"}
                        </Button>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    );
}
