import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';
import { UsersService } from '../users/users.service';

export type AuthBody = { email: string; password: string };

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  //localhost:3000/auth/login
  @Post('login')
  async signIn(@Body() body: AuthBody) {
    //const { email, password } = body;
    // return await this.authService.signIn(email, password);
  }

  //localhost:3000/auth/
  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticateUser(@Request() request: RequestWithUser) {
    return await this.usersService.user({ id: request.user.userId });
  }
}
