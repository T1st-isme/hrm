import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @IsString()
    @IsOptional()
    departmentId: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    profilePicture: string;

    @IsString()
    @IsOptional()
    contactNumber: string;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    dateOfBirth: Date;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    jobTitle: string;
}
