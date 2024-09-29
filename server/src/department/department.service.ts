import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.prisma.department.create({
      data: createDepartmentDto,
    });
    return {
      success: Boolean(department),
      result: department || "Không tạo được phòng ban!!!",
    };
  }

  async findAll() {
    const departments = await this.prisma.department.findMany();
    return {
      success: Boolean(departments),
      result: departments || "Không tìm thấy phòng ban!!!",
    };
  }

  async findOne(id: string) {
    const department = await this.prisma.department.findUnique({
      where: {
        id,
      },
    });
    return {
      success: Boolean(department),
      result: department || "Không tìm thấy phòng ban!!!",
    };
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.prisma.department.update({
      where: {
        id,
      },
      data: updateDepartmentDto,
    });
    return {
      success: Boolean(department),
      result: department || "Không tìm thấy phòng ban!!!",
    };
  }

  async remove(id: string) {
    const department = await this.prisma.department.delete({
      where: {
        id,
      },
    });
    return {
      success: Boolean(department),
      result: department || "Không tìm thấy phòng ban!!!",
    };
  }
}
