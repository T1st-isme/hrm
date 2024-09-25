import { Injectable } from '@nestjs/common';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Payroll } from '@prisma/client';

@Injectable()
export class PayrollService {
    constructor(private readonly prisma: PrismaService) {}
//   create(createPayrollDto: CreatePayrollDto) {
//     return this.prisma.payroll.create({
//       data: createPayrollDto,
//     });
//   }

  async findAll() {
    const payrolls = await this.prisma.payroll.findMany();
    return {
      success: Boolean(payrolls.length),
      result: payrolls.length ? payrolls : "Không tìm thấy bảng lương!!!",
    };
  }

  async findOne(id: string) {
    const payroll = await this.prisma.payroll.findUnique({
      where: {
        id,
      },
    });
    return {
      success: Boolean(payroll),
      result: payroll || "Không tìm thấy bảng lương!!!",
    };
  }

  async update(id: string, updatePayrollDto: UpdatePayrollDto) {
    const payroll = await this.prisma.payroll.update({
      where: {
        id,
      },
      data: updatePayrollDto,
    });
    return {
      success: Boolean(payroll),
      result: payroll || "Không tìm thấy bảng lương!!!",
    };
  }

  async remove(id: string) {
    const payroll = await this.prisma.payroll.delete({
      where: {
        id,
      },
    });
    return {
      success: Boolean(payroll),
      result: payroll || "Không tìm thấy bảng lương!!!",
    };
  }

  // Fetch payroll for an employee
  async getPayroll(employeeId: string) {
    const payrolls = await this.prisma.payroll.findMany({
      where: { employeeId },
    });
    return {
      success: Boolean(payrolls.length),
      result: payrolls.length ? payrolls : "Không tìm thấy bảng lương!!!",
    };
  }

  // Process payroll for an employee
  async processPayroll(
    employeeId: string,
    baseSalary: number,
    bonuses: { amount: number; reason: string }[],
    penalties: { amount: number; reason: string }[],
  ): Promise<{ success: boolean; result: Payroll | string }> {
    // Create payroll entry first
    const payroll = await this.prisma.payroll.create({
      data: {
        employeeId: employeeId,
        baseSalary: baseSalary,
        processedDate: new Date(),
        finalSalary: 0, // Initialize with a default value
      },
    });

    // Create bonus entries
    const bonusEntries = bonuses.map(bonus => ({
      amount: bonus.amount,
      reason: bonus.reason,
      payrollId: payroll.id,
    }));

    // Create penalty entries
    const penaltyEntries = penalties.map(penalty => ({
      amount: penalty.amount,
      reason: penalty.reason,
      payrollId: payroll.id,
    }));

    await this.prisma.bonus.createMany({
      data: bonusEntries,
    });

    await this.prisma.penalty.createMany({
      data: penaltyEntries,
    });

    // Calculate total bonuses and penalties
    const totalBonus = bonuses.reduce((sum, bonus) => sum + bonus.amount, 0);
    const totalPenalty = penalties.reduce((sum, penalty) => sum + penalty.amount, 0);

    // Calculate final salary
    const finalSalary = baseSalary + totalBonus - totalPenalty;

    // Update payroll with final salary
    await this.prisma.payroll.update({
      where: { id: payroll.id },
      data: { finalSalary: finalSalary },
    });

    return {
      success: Boolean(payroll),
      result: payroll || "Không tìm thấy bảng lương!!!",
    };
  }
}
