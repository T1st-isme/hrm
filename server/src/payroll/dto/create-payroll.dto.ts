import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePayrollDto {
    @IsString()
    @IsNotEmpty()
    employeeId: string;

    @IsNumber()
    @IsNotEmpty()
    baseSalary: number;

    @IsDate()
    @IsNotEmpty()
    processedDate: Date;
}
