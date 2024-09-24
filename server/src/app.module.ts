import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { LeaveRequestModule } from './leave-request/leave-request.module';
import { DepartmentModule } from './department/department.module';
import { PayrollModule } from './payroll/payroll.module';

@Module({
  imports: [EmployeeModule, LeaveRequestModule, DepartmentModule, PayrollModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
