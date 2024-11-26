import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        login: true,
        email: true,
      },
    });
    return users;
  }
}
