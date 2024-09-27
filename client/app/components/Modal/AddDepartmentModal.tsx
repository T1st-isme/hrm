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
import { useEffect, useMemo } from "react";
import { useDepartment } from "@/hooks/useDepartment";

const formSchema = z.object({
    name: z.string({ required_error: "Department name is required" }),
    description: z.string({ required_error: "Description is required" }),
    image: z.string({ required_error: "Image URL is required" }).url(),
});

export default function AddDepartmentModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { addDepartment } = useDepartment();
    const defaultValues = useMemo(
        () => ({
            name: "",
            description: "",
            image: "",
        }),
        []
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    useEffect(() => {
        if (!isOpen) {
            form.reset(defaultValues);
        }
    }, [isOpen, form, defaultValues]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        addDepartment({ ...values, id: Date.now().toString() });
        onClose();
    };

    return (
        <CustomDialog isOpen={isOpen} onClose={onClose} title="Add Department">
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
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    );
}
