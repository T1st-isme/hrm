"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRequest } from "@/hooks/useRequest";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";

export function LeaveRequestForm() {
    const { register, handleSubmit, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { createLeaveRequest, getLeaveRequestById } = useRequest();
    const { user } = useAuth();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);

        const employeeId = user?.id as string;
        const reason = data.reason;

        await createLeaveRequest({ employeeId, startDate, endDate, reason });
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setStartDate("");
        setEndDate("");
        reset(); // Reset the form

        await getLeaveRequestById(user?.id as string);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow rounded-lg p-6 space-y-4"
        >
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="startDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Start Date
                    </label>
                    <Input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="endDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        End Date
                    </label>
                    <Input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Reason for Leave
                </label>
                <Textarea
                    id="reason"
                    rows={3}
                    required
                    {...register("reason")}
                />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Leave Request"}
            </Button>
        </form>
    );
}
