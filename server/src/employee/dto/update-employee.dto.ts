import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @IsDate()
    @Type(() => Date)
    dateOfBirth: Date;

    @IsString()
    departmentId: string;
}
