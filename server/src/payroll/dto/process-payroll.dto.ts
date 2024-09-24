import { IsString, IsNumber, IsArray } from 'class-validator';

export class ProcessPayrollDto {
    @IsString()
    employeeId: string;

    @IsNumber()
    baseSalary: number;

    @IsArray()
    bonuses: { amount: number; reason: string }[];

    @IsArray()
    penalties: { amount: number; reason: string }[];
}
