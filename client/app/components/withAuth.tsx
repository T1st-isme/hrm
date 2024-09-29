"use client";

// hoc/withAuth.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/state/useAuthStore";
import { Loader2 } from "lucide-react";

const withAuth = (WrappedComponent: React.FC, requiredRoles: string[] = []) => {
    const RequiresAuth = (props: unknown) => {
        const { user, loading, checkAuth, hasRole } = useAuthStore();
        const router = useRouter();

        useEffect(() => {
            const verifyAuth = async () => {
                if (!user && !loading) {
                    await checkAuth();

                    const currentUser = useAuthStore.getState().user;

                    if (!currentUser) {
                        router.replace("/auth/login");
                    } else if (
                        requiredRoles.length > 0 &&
                        !requiredRoles.some((role) => hasRole(role))
                    ) {
                        router.replace("/404");
                    }
                }
            };

            verifyAuth();
        }, [user, loading, checkAuth, router, hasRole]);

        if (loading) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            );
        }

        if (
            user &&
            (requiredRoles.length === 0 ||
                requiredRoles.some((role) => hasRole(role)))
        ) {
            return <WrappedComponent {...(props as any)} />;
        }

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    };

    return RequiresAuth;
};

export default withAuth;
