import { Controller, Post, Get, Body} from '@nestjs/common';
import { AuthService } from './auth.service';

export type AuthBody = { email: string; password: string;};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //localhost:3000/auth/login
  @Post('login')
  async login(@Body() body: AuthBody)  {
    return await this.authService.login({authBody: body});
  }

  //localhost:3000/auth/
  @Get()
  async authenticate() {
    return;
  }
}
