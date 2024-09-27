import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import APIFeatures from 'src/Util/apiFeatures';
import { CloudinaryService } from 'src/Util/cloudinary.service';

export const roundsOfHashing = 10;

@Injectable()
export class EmployeeService {
    constructor(private prisma: PrismaService, private cloudinaryService: CloudinaryService) {}



    async create(createEmployeeDto: CreateEmployeeDto, profilePicture: Express.Multer.File) {
        const hashedPassword = await bcrypt.hash(
          createEmployeeDto.password,
          roundsOfHashing,
        );

        let profilePictureUrl = createEmployeeDto.profilePicture;
        if (profilePicture) {
          const uploadResult = await this.cloudinaryService.uploadImage(profilePicture);
          if ('secure_url' in uploadResult) {
            profilePictureUrl = uploadResult.secure_url;
          }
        }

        const employee = await this.prisma.employee.create({
          data: {
            ...createEmployeeDto,
            fullName: `${createEmployeeDto.firstName} ${createEmployeeDto.lastName}`,
            profilePicture: profilePictureUrl,
            dateOfBirth: new Date(createEmployeeDto.dateOfBirth).toISOString(),
            password: hashedPassword,
          },
        });

        //gán user role cho nhân viên
        const userRole = await this.prisma.role.findUnique({
          where: { name: 'user' },
        });
        if (userRole) {
          await this.prisma.employeeRole.create({
            data: {
              employeeId: employee.id,
              roleId: userRole.id,
            },
          });
        }
        return {
          success: Boolean(employee),
          result: employee || 'Không tạo được nhân viên!!!',
        };
      }

  async findAll(query: any) {
    const page = parseInt(query.page, 10) || 1;
    const resPerPage = parseInt(query.resPerPage, 10) || 10;
    const employeesCount = await this.prisma.employee.count();
    const totalPages = Math.ceil(employeesCount / resPerPage);
    if (page > totalPages) {
      return {
        success: false,
        message: "Invalid page number",
      };
    }

    const apiFeatures = new APIFeatures({ where: {} }, query)
        .search()
        .filter()
        .limit()
        .sort()
        .pagination(resPerPage);
    const result = await this.prisma.employee.findMany({
      ...apiFeatures.query,
      include: {
        employeeRoles: {
          include: {
            role: true,
          },
        },
        department: true,
      },
      skip: (page - 1) * resPerPage,
      take: resPerPage
    });
    const filteredEmployeesCount = result.length;
    return {
      success: Boolean(result.length),
      employeesCount,
      totalPages,
      currentPage: page,
      resPerPage,
      filteredEmployeesCount,
      result
    };
  }


  async findOne(id: string) {
    if (!id) {
      throw new Error('Employee ID must be provided');
    }

    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
      },
      include: {
        department: true,
        employeeRoles: {
          include: {
            role: true,
          },
        },
        leaveRequests: true,
      },
    });

    return {
      success: Boolean(employee),
      result: employee || 'Không tìm thấy nhân viên!!!',
    };
  }

  async findByEmail(email: string) {
    const employee = await this.prisma.employee.findUnique({
      where: {
        email,
      },
    });
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto, profilePicture: Express.Multer.File) {
    const hashedPassword = await bcrypt.hash(
      updateEmployeeDto.password,
      roundsOfHashing,
    );

    let profilePictureUrl = updateEmployeeDto.profilePicture;
    if (profilePicture) {
      const uploadResult = await this.cloudinaryService.uploadImage(profilePicture);
      if ('secure_url' in uploadResult) {
        profilePictureUrl = uploadResult.secure_url;
      }
    }

    const employee = await this.prisma.employee.update({
      where: {
        id,
      },
      data: {
        ...updateEmployeeDto,
        profilePicture: profilePictureUrl,
        dateOfBirth: new Date(updateEmployeeDto.dateOfBirth).toISOString(),
        password: hashedPassword,
      },
    });
    return {
      success: Boolean(employee),
      result: employee || 'Không tìm thấy nhân viên!!!',
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
      result: employee || 'Không tìm thấy nhân viên!!!',
    };
  }
}
