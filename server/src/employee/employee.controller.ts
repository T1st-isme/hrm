import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employee')

export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture'))
  create(@Body() createEmployeeDto: CreateEmployeeDto, @UploadedFile() profilePicture: Express.Multer.File) {
    return this.employeeService.create(createEmployeeDto, profilePicture);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.employeeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('profilePicture'))
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto, @UploadedFile() profilePicture: Express.Multer.File) {
    return this.employeeService.update(id, updateEmployeeDto, profilePicture);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
