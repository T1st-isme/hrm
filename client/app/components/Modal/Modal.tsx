import { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
}

export default function CustomDialog({
    isOpen,
    onClose,
    title,
    children,
}: DialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        Fill in the details to add a new employee.
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}
