import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEmployee } from "@/hooks/useEmployee";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState, useRef, useMemo } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useDepartment } from "@/hooks/useDepartment";

const formSchema = z.object({
    firstName: z.string({ required_error: "First name is required" }),
    lastName: z.string({ required_error: "Last name is required" }),
    profilePicture: z.string({ required_error: "Profile picture is required" }),
    dateOfBirth: z.string({ required_error: "Date of birth is required" }),
    email: z.string({ required_error: "Invalid email address" }).email(),
    password: z.string({ required_error: "Password is required" }),
    address: z.string({ required_error: "Address is required" }),
    contactNumber: z.string({ required_error: "Phone number is required" }),
    jobTitle: z.string({ required_error: "Job title is required" }),
    departmentId: z.string({ required_error: "Department is required" }),
});

export default function AddEmployeeModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { addEmployee } = useEmployee();
    const [avatar, setAvatar] = useState<File | null>(null);
    const { departments, fetchDepartments } = useDepartment();
    const fetchedRef = useRef(false);

    const defaultValues = useMemo(
        () => ({
            firstName: "",
            lastName: "",
            profilePicture: "",
            dateOfBirth: "",
            email: "",
            password: "",
            address: "",
            contactNumber: "",
            jobTitle: "",
            departmentId: "",
        }),
        []
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    useEffect(() => {
        if (isOpen && !fetchedRef.current) {
            fetchDepartments();
            fetchedRef.current = true;
        }
    }, [isOpen, fetchDepartments]);

    useEffect(() => {
        if (!isOpen) {
            form.reset(defaultValues);
            setAvatar(null);
        }
    }, [isOpen, form, defaultValues]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const formattedValues = {
            ...values,
            dateOfBirth: values.dateOfBirth
                ? format(new Date(values.dateOfBirth), "yyyy-MM-dd")
                : "",
        };
        addEmployee(formattedValues, avatar);
        onClose();
    };

    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(file);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <CustomDialog isOpen={isOpen} onClose={onClose} title="Add Employee">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            General Information
                        </h3>
                        <div className="flex items-center space-x-4 mb-4">
                            <Avatar className="w-24 h-24">
                                <AvatarImage
                                    src={
                                        avatar
                                            ? URL.createObjectURL(avatar)
                                            : "/placeholder.svg?height=96&width=96"
                                    }
                                />
                                <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>
                            <div>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() =>
                                        document
                                            .getElementById("avatar-upload")
                                            ?.click()
                                    }
                                >
                                    Upload Avatar
                                </Button>
                                <Input
                                    id="avatar-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={handleAvatarUpload}
                                    accept="image/*"
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Please upload a .jpg or a .png file with a
                                    minimum dimension of 400x x 400h not
                                    exceeding 5MB
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date of Birth</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={`w-full pl-3 text-left font-normal ${
                                                            !field.value &&
                                                            "text-muted-foreground"
                                                        }`}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "MM/dd/yyyy"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={
                                                        field.value
                                                            ? new Date(
                                                                  field.value
                                                              )
                                                            : undefined
                                                    }
                                                    onSelect={(date) =>
                                                        field.onChange(
                                                            date
                                                                ? format(
                                                                      date,
                                                                      "yyyy-MM-dd"
                                                                  )
                                                                : ""
                                                        )
                                                    }
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
                                                    }
                                                    initialFocus
                                                    captionLayout="dropdown-buttons"
                                                    fromYear={1900}
                                                    toYear={new Date().getFullYear()}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Contact Information
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contactNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="tel" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Employment Information
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="jobTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Job Title / Occupation
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="departmentId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a department" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Array.isArray(departments) &&
                                                    departments.map(
                                                        (department) => (
                                                            <SelectItem
                                                                key={
                                                                    department.id
                                                                }
                                                                value={
                                                                    department.id
                                                                }
                                                            >
                                                                {
                                                                    department.name
                                                                }
                                                            </SelectItem>
                                                        )
                                                    )}
                                            </SelectContent>
                                        </Select>
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
