// import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { JwtService } from '@nestjs/jwt';
// import { AuthEntity } from './entities/auth.entity';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//     constructor(private prisma: PrismaService, private jwtService: JwtService) {}

//   async login(email: string, password: string): Promise<AuthEntity> {

//     // Step 1: Fetch a user with the given email
//     const user = await this.prisma.employee.findUnique({ where: { email: email } });

//     // If no user is found, throw an error
//     if (!user) {
//       throw new NotFoundException(`No user found for email: ${email}`);
//     }

//     // Step 2: Check if the password is correct
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     // If password does not match, throw an error
//     if (!isPasswordValid) {
//       throw new UnauthorizedException('Invalid password');
//     }

//     // Step 3: Generate a JWT containing the user's ID and return it
//     return {
//       accessToken: this.jwtService.sign({ userId: user.id }),
//     };
//   }
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.employee.findUnique({
      where: { email },
      include: {
        department: true,
        employeeRoles: {
          include: {
            role: true,
          },
        },
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userValidate = await this.validateUser(user.email, user.password);
    if (!userValidate) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check quyền
    const employeeRoles = await this.prisma.employeeRole.findMany({
      where: { employeeId: userValidate.id },
      include: { role: true },
    });

    console.log('Employee Roles:', employeeRoles);

    // const roles = employeeRoles.map(er => er.role.name);

    const payload = {
      email: user.email,
      id: userValidate.id,
      firstName: userValidate.firstName,
      lastName: userValidate.lastName,
      jobTitle: userValidate.jobTitle,
      department: userValidate.department.name,
      fullName: userValidate.fullName,
      contactNumber: userValidate.contactNumber,
      profilePicture: userValidate.profilePicture,
      roles: userValidate.employeeRoles.map((x) => x.role.name),
    };

    return {
      success: true,
      access_token: this.jwtService.sign(payload),
      user: {
        email: userValidate.email,
        firstName: userValidate.firstName,
        lastName: userValidate.lastName,
        roles: userValidate.employeeRoles.map((x) => x.role.name),
      },
    };
  }

  async getUserRoles(userId: string): Promise<string[]> {
    const employeeRoles = await this.prisma.employeeRole.findMany({
      where: { employeeId: userId },
      include: { role: true },
    });

    return employeeRoles.map((er) => er.role.name);
  }

  async assignRoleToUser(userId: string, roleName: string): Promise<void> {
    const role = await this.prisma.role.findUnique({
      where: { name: roleName },
    });
    if (role) {
      await this.prisma.employeeRole.create({
        data: { employeeId: userId, roleId: role.id },
      });
    }
  }
}
