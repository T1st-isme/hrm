import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';

@Injectable()
export class LeaveRequestService {
  constructor(private readonly prisma: PrismaService) {}

  checkLeaveRequestStatus(status: string) {
    if (status === 'APPROVED' || status === 'REJECTED') {
      return true;
    }
    return false;
  }

  async create(createLeaveRequestDto: CreateLeaveRequestDto) {
    const leaveRequest = await this.prisma.leaveRequest.create({
      data: {
        startDate: new Date(createLeaveRequestDto.startDate).toISOString(),
        endDate: new Date(createLeaveRequestDto.endDate).toISOString(),
        reason: createLeaveRequestDto.reason,
        employee: {
          connect: {
            id: createLeaveRequestDto.employeeId,
          },
        },
      },
      include: {
        employee: {
          select: {
            id: true,
            fullName: true,
            email: true,
            contactNumber: true,
            profilePicture: true,
            jobTitle: true,
            department: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      success: Boolean(leaveRequest),
      result: leaveRequest ?? 'Leave request creation failed!!!',
    };
  }
  async findAll() {
    const leaveRequest = await this.prisma.leaveRequest.findMany({
      include: {
        employee: {
          select: {
            fullName: true,
            contactNumber: true,
            email: true,
            jobTitle: true,
            profilePicture: true,
            department: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return {
      success: Boolean(leaveRequest),
      result: leaveRequest ?? 'No leave request found!!!',
    };
  }

  async findOne(id: string) {
    const leaveRequest = await this.prisma.leaveRequest.findUnique({
      where: {
        id,
      },
    });

    return {
      success: Boolean(leaveRequest),
      result: leaveRequest ?? 'Leave request not found!!!',
    };
  }


  async getLeaveRequestByEmployeeId(employeeId: string) {
    const leaveRequest = await this.prisma.leaveRequest.findMany({
      where: {
        employeeId,
      },
      include: {
        employee: {
          select: {
            fullName: true,
            contactNumber: true,
            email: true,
            jobTitle: true,
            profilePicture: true,
          },
        },
      },
    });

    return {
      success: Boolean(leaveRequest),
      result: leaveRequest ?? 'Leave request not found!!!',
    };
  }


  async update(id: string, updateLeaveRequestDto: UpdateLeaveRequestDto) {
    const leaveRequest = await this.prisma.leaveRequest.update({
      where: {
        id,
      },
      data: {
        startDate: new Date(updateLeaveRequestDto.startDate).toISOString(),
        endDate: new Date(updateLeaveRequestDto.endDate).toISOString(),
        reason: updateLeaveRequestDto.reason,
      },
    });

    return {
      success: Boolean(leaveRequest),
      result: leaveRequest ?? 'Leave request update failed!!!',
    };
  }

  async remove(id: string) {
    const leaveRequest = await this.prisma.leaveRequest.delete({
      where: {
        id,
      },
    });

    return {
      success: Boolean(leaveRequest),
      result: leaveRequest ?? 'Leave request deletion failed!!!',
    };
  }

  async approve(id: string) {
    //check if the leave request is already approved or rejected
    const checkRequest = await this.prisma.leaveRequest.findUnique({
      where: { id },
    });

    if (this.checkLeaveRequestStatus(checkRequest.status)) {
      return {
        success: false,
        result: 'Leave request already processed!!!',
      };
    }

    const leaveRequest = await this.prisma.leaveRequest.update({
      where: { id },
      data: { status: 'APPROVED' },
    });

    if (leaveRequest) {
      await this.prisma.employee.update({
        where: { id: leaveRequest.employeeId },
        data: { status: 'ON_LEAVE' },
      });
    }

    return {
      success: Boolean(leaveRequest),
      result: leaveRequest ?? 'Leave request approval failed!!!',
    };
  }

  async reject(id: string) {
    //check if the leave request is already approved or rejected
    const checkRequest = await this.prisma.leaveRequest.findUnique({
      where: { id },
    });

    if (this.checkLeaveRequestStatus(checkRequest.status)) {
      return {
        success: false,
        result: 'Leave request already processed!!!',
      };
    }

    const leaveRequest = await this.prisma.leaveRequest.update({
      where: { id },
      data: { status: 'REJECTED' },
    });

    return {
      success: Boolean(leaveRequest),
      result: leaveRequest ?? 'Leave request rejection failed!!!',
    };
  }
}
