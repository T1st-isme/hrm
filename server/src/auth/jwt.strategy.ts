//src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from './auth.module';
import { EmployeeService } from 'src/employee/employee.service';
import { Request } from 'express';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private employeeService: EmployeeService) {
    super({
        jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
            const token = request?.cookies?.jwt;
            if (!token) {
              return null;
            }
            return token;
          }]),
          ignoreExpiration: false,
        secretOrKey: jwtSecret,
      });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);
    const { email } = payload;
    const user = await this.employeeService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
