import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}


   // Get payroll history for an employee
   @Get(':employeeId')
   async getPayroll(@Param('employeeId') employeeId: string) {
     return this.payrollService.getPayroll(employeeId);
   }

   // Process payroll for an employee
   @Post('process/:employeeId')
   async processPayroll(
     @Param('employeeId') employeeId: string,
     @Body() payrollDto: { baseSalary: number, bonuses: { amount: number; reason: string }[], penalties: { amount: number; reason: string }[] }
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
  findAll() {
    return this.payrollService.findAll();
  }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.payrollService.findOne(id);
//   }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayrollDto: UpdatePayrollDto) {
    return this.payrollService.update(id, updatePayrollDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payrollService.remove(id);
  }
}
