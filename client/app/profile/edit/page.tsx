"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/app/components/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { useEmployee } from "@/hooks/useEmployee";
import { useDepartment } from "@/hooks/useDepartment";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading";

export default function EditProfile() {
    const { toast } = useToast();
    const { user } = useAuth();
    const { employee, updateEmployee, getEmployeeById, loading } =
        useEmployee();
    const { departments, fetchDepartments } = useDepartment();
    const [avatar, setAvatar] = useState<File | string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (user?.id) {
            getEmployeeById(user?.id);
            if (!departments || departments.length === 0) {
                fetchDepartments();
            }
        }
    }, [user?.id, departments.length]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        await updateEmployee(user?.id as string, data as any, avatar);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast({
            title: "Profile updated",
            description: "Your profile has been successfully updated.",
        });
        router.push("/profile");
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

    const avatarSrc = avatar
        ? typeof avatar === "string"
            ? avatar
            : URL.createObjectURL(avatar)
        : "/placeholder.svg?height=96&width=96";

    return (
        <MainLayout title="Edit Profile">
            {loading ? (
                <Loading />
            ) : (
                <div className="flex flex-col min-h-screen bg-background">
                    <main className="flex-1 py-6 px-4 lg:px-8">
                        <div className="max-w-8xl mx-auto space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold">
                                    Edit Profile
                                </h1>
                                <p className="text-muted-foreground">
                                    Update your personal information and
                                    settings
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Personal Information
                                        </CardTitle>
                                        <CardDescription>
                                            Update your photo and personal
                                            details here.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-20 w-20">
                                                <AvatarImage src={avatarSrc} />
                                                <AvatarFallback>
                                                    {employee?.firstName?.charAt(
                                                        0
                                                    )}
                                                    {employee?.lastName?.charAt(
                                                        0
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            <Button
                                                variant="outline"
                                                type="button"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            "avatar-upload"
                                                        )
                                                        ?.click()
                                                }
                                            >
                                                Change Photo
                                            </Button>
                                            <Input
                                                id="avatar-upload"
                                                type="file"
                                                className="hidden"
                                                onChange={handleAvatarUpload}
                                                accept="image/*"
                                            />
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="grid gap-2">
                                                <Label htmlFor="firstName">
                                                    First Name
                                                </Label>
                                                <Input
                                                    id="firstName"
                                                    defaultValue={
                                                        employee?.firstName
                                                    }
                                                    name="firstName"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="lastName">
                                                    Last Name
                                                </Label>
                                                <Input
                                                    id="lastName"
                                                    defaultValue={
                                                        employee?.lastName
                                                    }
                                                    name="lastName"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                defaultValue={employee?.email}
                                                name="email"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone">
                                                Phone Number
                                            </Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                defaultValue={
                                                    employee?.contactNumber
                                                }
                                                name="contactNumber"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="address">
                                                Address
                                            </Label>
                                            <Textarea
                                                id="address"
                                                defaultValue={employee?.address}
                                                name="address"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="department">
                                                Department
                                            </Label>
                                            <Select
                                                defaultValue={
                                                    employee?.department?.name
                                                }
                                            >
                                                <SelectTrigger id="department">
                                                    <SelectValue
                                                        placeholder={
                                                            user?.department
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {departments.map(
                                                        (department) => (
                                                            <SelectItem
                                                                key={
                                                                    department.id
                                                                }
                                                                value={
                                                                    department.name
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
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="position">
                                                Position
                                            </Label>
                                            <Input
                                                id="position"
                                                defaultValue={
                                                    employee?.jobTitle
                                                }
                                                name="jobTitle"
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            type="submit"
                                            className="ml-auto"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Updating..."
                                                : "Update Profile"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </form>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>
                                        Change your password here. After saving,
                                        you&apos;ll be logged out.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="currentPassword">
                                            Current Password
                                        </Label>
                                        <Input
                                            id="currentPassword"
                                            type="password"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="newPassword">
                                            New Password
                                        </Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="confirmPassword">
                                            Confirm New Password
                                        </Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="outline"
                                        className="ml-auto"
                                    >
                                        Change Password
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </main>
                </div>
            )}
        </MainLayout>
    );
}
