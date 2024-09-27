import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AssignRoleDto } from './dto/assignRole.dto';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user } = await this.authService.login(loginDto);
    res.cookie('jwt', access_token, {
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRES_TIME) * 24 * 60 * 60 * 1000,
      ),
    });
    return { success: true, access_token, user };
  }

  @Post('assign-role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return this.authService.assignRoleToUser(
      assignRoleDto.userId,
      assignRoleDto.roleName,
    );
  }
}
