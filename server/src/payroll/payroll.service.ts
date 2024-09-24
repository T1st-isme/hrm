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

  findAll() {
    return this.prisma.payroll.findMany();
  }

  findOne(id: string) {
    return this.prisma.payroll.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updatePayrollDto: UpdatePayrollDto) {
    return this.prisma.payroll.update({
      where: {
        id,
      },
      data: updatePayrollDto,
    });
  }

  remove(id: string) {
    return this.prisma.payroll.delete({
      where: {
        id,
      },
    });
  }



  // Fetch payroll for an employee
  async getPayroll(employeeId: string) {
    return this.prisma.payroll.findMany({
      where: { employeeId },
    });
  }

  // Process payroll for an employee
  async processPayroll(
    employeeId: string,
    baseSalary: number,
    bonuses: { amount: number; reason: string }[],
    penalties: { amount: number; reason: string }[],
  ): Promise<Payroll> {
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

    return payroll;
  }


}
