"use client";

import { useState } from "react";
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
import { Loader2, UserCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { loading, login, error, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            return;
        }
        try {
            await login({ email, password });
            if (!error) {
                console.log("Login successful");
                console.log(user?.email);
                console.log(`Welcome ${user?.firstName} ${user?.lastName}`);
                router.push("/");
            }
        } catch (error) {
            console.error("An error occurred during login: " + error);
        }
    };

    return (
        loading ? (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            </div>
        ) : (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <UserCircle className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-2xl text-center">
                        Login to HRM System
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and password to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            {error && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full mt-4">
                            Sign in
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center space-y-2">
                    <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:underline"
                    >
                        Forgot your password?
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account? Contact your HR department
                    </p>
                </CardFooter>
            </Card>
            </div>
        )
    );
}
