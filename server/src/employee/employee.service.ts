import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
    constructor(private prisma: PrismaService) {}

    async create(createEmployeeDto: CreateEmployeeDto) {
        const employee = await this.prisma.employee.create({
            data:  {
                ...createEmployeeDto,
                fullName: `${createEmployeeDto.firstName} ${createEmployeeDto.lastName}`,
                dateOfBirth: new Date(createEmployeeDto.dateOfBirth).toISOString(),
            }
        });
        return {
            success: Boolean(employee),
            result: employee || "Không tạo được nhân viên!!!",
        };
    }

    async findAll() {
        const employees = await this.prisma.employee.findMany({
            include: {
                department: true,
            },
        });
        return {
            success: Boolean(employees),
            result: employees || "Không tìm thấy nhân viên!!!",
        };
    }

    async findOne(id: string) {
        const employee = await this.prisma.employee.findUnique({
            where: {
                id,
            },
            include: {
                department: true,
            },
        });
        return {
            success: Boolean(employee),
            result: employee || "Không tìm thấy nhân viên!!!",
        };
    }

    async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
        const employee = await this.prisma.employee.update({
            where: {
                id,
            },
            data: {
                ...updateEmployeeDto,
                dateOfBirth: new Date(updateEmployeeDto.dateOfBirth).toISOString(),
            },
        });
        return {
            success: Boolean(employee),
            result: employee || "Không tìm thấy nhân viên!!!",
        };
    }

    async remove(id: string) {
        const employee = await this.prisma.employee.delete({
            where: {
                id,
            },
        });
        return {
            success: Boolean(employee),
            result: employee || "Không tìm thấy nhân viên!!!",
        };
    }
}
