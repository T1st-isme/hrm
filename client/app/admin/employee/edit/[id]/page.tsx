// "use client";

// import { useEffect, useState } from "react";
// import { Calendar } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Calendar as CalendarComponent } from "@/components/ui/calendar";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { format } from "date-fns";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { useDepartment } from "@/hooks/useDepartment";
// import { useEmployee } from "@/hooks/useEmployee";
// import MainLayout from "@/app/components/MainLayout";

// const formSchema = z.object({
//     firstName: z.string({ required_error: "First name is required" }),
//     lastName: z.string({ required_error: "Last name is required" }),
//     profilePicture: z.string({ required_error: "Profile picture is required" }),
//     dateOfBirth: z.string({ required_error: "Date of birth is required" }),
//     email: z.string({ required_error: "Invalid email address" }).email(),
//     password: z.string({ required_error: "Password is required" }),
//     address: z.string({ required_error: "Address is required" }),
//     contactNumber: z.string({ required_error: "Phone number is required" }),
//     jobTitle: z.string({ required_error: "Job title is required" }),
//     departmentId: z.string({ required_error: "Department is required" }),
// });

// export default function EditEmployeeForm({
//     closeDialog,
//     params,
//     onSubmit,
// }: {
//     closeDialog: () => void;
//     params: { id: string };
//     onSubmit: (values: z.infer<typeof formSchema>) => void;
// }) {
//     const id = params.id;
//     const { loading, error, getEmployeeById, employee } = useEmployee();
//     const { departments, fetchDepartments } = useDepartment();
//     const [avatar, setAvatar] = useState<string | null>(null);

//     useEffect(() => {
//         fetchDepartments();
//         if (id) {
//             getEmployeeById(id);
//         }
//     }, [id, fetchDepartments, getEmployeeById]);

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             firstName: employee?.firstName,
//             lastName: employee?.lastName,
//             profilePicture: employee?.profilePicture,
//             dateOfBirth: employee?.dateOfBirth,
//             email: employee?.email,
//             password: employee?.password,
//             address: employee?.address,
//             contactNumber: employee?.contactNumber,
//             jobTitle: employee?.jobTitle,
//             departmentId: employee?.departmentId,
//         },
//     });

//     // const { reset } = form;

//     const handleSubmit = (values: z.infer<typeof formSchema>) => {
//         onSubmit(values);
//         closeDialog();
//     };

//     const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setAvatar(reader.result as string);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     if (loading)
//         return (
//             <MainLayout title="">
//                 <div>Loading...</div>
//             </MainLayout>
//         );
//     if (error)
//         return (
//             <MainLayout title="">
//                 <div>Error: {error}</div>
//             </MainLayout>
//         );

//     return (
//         <div className="container mx-auto p-6 bg-gray-100">
//             <div className="bg-white p-6 rounded-lg shadow">
//                 <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
//                 <Form {...form}>
//                     <form
//                         onSubmit={form.handleSubmit(handleSubmit)}
//                         className="space-y-8"
//                     >
//                         <div>
//                             <h3 className="text-lg font-semibold mb-4">
//                                 General Information
//                             </h3>
//                             <div className="flex items-center space-x-4 mb-4">
//                                 <Avatar className="w-24 h-24">
//                                     <AvatarImage
//                                         src={
//                                             avatar ||
//                                             "/placeholder.svg?height=96&width=96"
//                                         }
//                                     />
//                                     <AvatarFallback>
//                                         {form.watch("firstName")
//                                             ? form.watch("firstName").charAt(0)
//                                             : "A"}
//                                     </AvatarFallback>
//                                 </Avatar>
//                                 <div>
//                                     <Button
//                                         type="button"
//                                         variant="secondary"
//                                         onClick={() =>
//                                             document
//                                                 .getElementById("avatar-upload")
//                                                 ?.click()
//                                         }
//                                     >
//                                         Upload Avatar
//                                     </Button>
//                                     <Input
//                                         id="avatar-upload"
//                                         type="file"
//                                         className="hidden"
//                                         onChange={handleAvatarUpload}
//                                         accept="image/*"
//                                     />
//                                     <p className="text-sm text-gray-500 mt-2">
//                                         Please upload a .jpg or a .png file with
//                                         a minimum dimension of 400x x 400h not
//                                         exceeding 5MB
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="grid grid-cols-3 gap-4">
//                                 <FormField
//                                     control={form.control}
//                                     name="firstName"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>First Name</FormLabel>
//                                             <FormControl>
//                                                 <Input {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={form.control}
//                                     name="lastName"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Last Name</FormLabel>
//                                             <FormControl>
//                                                 <Input {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={form.control}
//                                     name="dateOfBirth"
//                                     render={({ field }) => (
//                                         <FormItem className="flex flex-col">
//                                             <FormLabel>Date of Birth</FormLabel>
//                                             <Popover>
//                                                 <PopoverTrigger asChild>
//                                                     <FormControl>
//                                                         <Button
//                                                             variant={"outline"}
//                                                             className={`w-full pl-3 text-left font-normal ${
//                                                                 !field.value &&
//                                                                 "text-muted-foreground"
//                                                             }`}
//                                                         >
//                                                             {field.value ? (
//                                                                 format(
//                                                                     field.value,
//                                                                     "MM/dd/yyyy"
//                                                                 )
//                                                             ) : (
//                                                                 <span>
//                                                                     Pick a date
//                                                                 </span>
//                                                             )}
//                                                             <Calendar className="ml-auto h-4 w-4 opacity-50" />
//                                                         </Button>
//                                                     </FormControl>
//                                                 </PopoverTrigger>
//                                                 <PopoverContent
//                                                     className="w-auto p-0"
//                                                     align="start"
//                                                 >
//                                                     <CalendarComponent
//                                                         mode="single"
//                                                         selected={field.value}
//                                                         onSelect={
//                                                             field.onChange
//                                                         }
//                                                         disabled={(date) =>
//                                                             date > new Date() ||
//                                                             date <
//                                                                 new Date(
//                                                                     "1900-01-01"
//                                                                 )
//                                                         }
//                                                         initialFocus
//                                                     />
//                                                 </PopoverContent>
//                                             </Popover>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={form.control}
//                                     name="email"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Email</FormLabel>
//                                             <FormControl>
//                                                 <Input
//                                                     {...field}
//                                                     type="email"
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={form.control}
//                                     name="password"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Password</FormLabel>
//                                             <FormControl>
//                                                 <Input
//                                                     {...field}
//                                                     type="password"
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <h3 className="text-lg font-semibold mb-4">
//                                 Contact Information
//                             </h3>
//                             <div className="grid grid-cols-3 gap-4">
//                                 <FormField
//                                     control={form.control}
//                                     name="address"
//                                     render={({ field }) => (
//                                         <FormItem className="col-span-2">
//                                             <FormLabel>Address</FormLabel>
//                                             <FormControl>
//                                                 <Input {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={form.control}
//                                     name="contactNumber"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Phone</FormLabel>
//                                             <FormControl>
//                                                 <Input {...field} type="tel" />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <h3 className="text-lg font-semibold mb-4">
//                                 Employment Information
//                             </h3>
//                             <div className="grid grid-cols-3 gap-4">
//                                 <FormField
//                                     control={form.control}
//                                     name="jobTitle"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>
//                                                 Job Title / Occupation
//                                             </FormLabel>
//                                             <FormControl>
//                                                 <Input {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     name="departmentId"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Department</FormLabel>
//                                             <Select
//                                                 onValueChange={field.onChange}
//                                                 defaultValue={field.value}
//                                             >
//                                                 <FormControl>
//                                                     <SelectTrigger>
//                                                         <SelectValue placeholder="Select a department" />
//                                                     </SelectTrigger>
//                                                 </FormControl>
//                                                 <SelectContent>
//                                                     {Array.isArray(
//                                                         departments
//                                                     ) &&
//                                                         departments.map(
//                                                             (department) => (
//                                                                 <SelectItem
//                                                                     key={
//                                                                         department.id
//                                                                     }
//                                                                     value={
//                                                                         department.id
//                                                                     }
//                                                                 >
//                                                                     {
//                                                                         department.name
//                                                                     }
//                                                                 </SelectItem>
//                                                             )
//                                                         )}
//                                                 </SelectContent>
//                                             </Select>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex justify-end space-x-4">
//                             <Button
//                                 type="button"
//                                 variant="outline"
//                                 onClick={closeDialog}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button type="submit">Submit</Button>
//                         </div>
//                     </form>
//                 </Form>
//             </div>
//         </div>
//     );
// }
