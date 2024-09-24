import { IsString, IsEmail, IsDate, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
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

    @IsString()
    fullName: string;

    @IsDate()
    dateOfBirth: Date;

    @IsString()
    address: string;

    @IsString()
    jobTitle: string;

    @IsString()
    departmentId: string;

}
