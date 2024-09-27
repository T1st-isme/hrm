import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('leave-request')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeaveRequestController {
  constructor(private readonly leaveRequestService: LeaveRequestService) {}

  @Post()
  @Roles("admin", "user")
  create(@Body() createLeaveRequestDto: CreateLeaveRequestDto) {
    console.log('CreateLeaveRequestDto:', createLeaveRequestDto);
    return this.leaveRequestService.create(createLeaveRequestDto);
  }

  @Get()
//   @Roles("admin")
  findAll() {
    return this.leaveRequestService.findAll();
  }

  @Get(':id')
  @Roles("admin", "user")
  findOne(@Param('id') id: string) {
    return this.leaveRequestService.findOne(id);
  }

  @Patch(':id/approve')
//   @Roles("admin")
  approve(@Param('id') id: string) {
    return this.leaveRequestService.approve(id);
  }

  @Patch(':id/reject')
//   @Roles("admin")
  reject(@Param('id') id: string) {
    return this.leaveRequestService.reject(id);
  }
}
