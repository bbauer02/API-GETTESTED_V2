import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {PrismaService} from "../prisma.service";
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as process from "process";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION},
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService]
})
export class AuthModule {}
