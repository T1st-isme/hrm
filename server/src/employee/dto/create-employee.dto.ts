import { IsString, IsEmail, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    profilePicture: string;

    @IsString()
    @IsOptional()
    contactNumber: string;

    @IsDate()
    @Type(() => Date)
    dateOfBirth: Date;

    @IsString()
    address: string;

    @IsString()
    jobTitle: string;

    @IsString()
    departmentId: string;
}
