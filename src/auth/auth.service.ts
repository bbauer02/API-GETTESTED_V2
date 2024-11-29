import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthBody } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /*
  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { user_id: user.id, login: user.login, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  private async isPasswordValid(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
  */
}
