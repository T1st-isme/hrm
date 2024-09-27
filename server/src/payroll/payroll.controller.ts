import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('payroll')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  // Process payroll for an employee
  @Post('process/:employeeId')
  @Roles('admin')
  async processPayroll(
    @Param('employeeId') employeeId: string,
    @Body()
    payrollDto: {
      baseSalary: number;
      bonuses: { amount: number; reason: string }[];
      penalties: { amount: number; reason: string }[];
    },
  ) {
    return this.payrollService.processPayroll(
      employeeId,
      payrollDto.baseSalary,
      payrollDto.bonuses,
      payrollDto.penalties,
    );
  }

  //   @Post()
  //   create(@Body() createPayrollDto: CreatePayrollDto) {
  //     return this.payrollService.create(createPayrollDto);
  //   }

  @Get()
  @Roles('admin')
  findAll() {
    return this.payrollService.findAll();
  }

  // Get payroll history for an employee
  @Get(':id')
  @Roles('admin', 'user')
  async getPayroll(@Param('id') id: string) {
    return this.payrollService.getPayroll(id);
  }
  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.payrollService.findOne(id);
  //   }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updatePayrollDto: UpdatePayrollDto) {
    return this.payrollService.update(id, updatePayrollDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.payrollService.remove(id);
  }
}
