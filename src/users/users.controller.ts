import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // localhost:3000/users
  getUsers() {
    return this.usersService.users({});
  }

  @Get(':id')
  // localhost:3000/users/:id
  getUser(@Param('id') id: string) {
    return this.usersService.user({ id });
  }




}
