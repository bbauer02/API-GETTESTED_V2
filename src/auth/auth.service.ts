import {Injectable} from '@nestjs/common';
import {AuthBody} from './auth.controller';
import {PrismaService} from "../prisma.service";
import {hash, compare} from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {
  }

  /*
  * This method is responsible for handling the login logic.
   */
  async login({authBody}: { authBody: AuthBody }) {
    const {email, password} = authBody;
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!existingUser) {
      throw new Error('User does not exist');
    }

    if (!await this.isPasswordValid(password, existingUser.password)) {
      throw new Error('Invalid password');
    }
    return this.authentificatedUser(existingUser.id);
  }


  private async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  private async isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  private authentificatedUser(userId: string) {
    const payload = { userId };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

}
