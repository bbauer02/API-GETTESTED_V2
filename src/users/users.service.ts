import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {
  }
  /*
  * user
  * - Cette fonction permet de récupérer un utilisateur en fonction de l'identifiant passé en argument
  * @param id : Prisma.UserWhereUniqueInput
  * @return Promise<User | null>
   */
  async user( id : Prisma.UserWhereUniqueInput)  :  Promise<Partial<User> | null> {
    return this.prisma.user.findUnique({
      where : id,
      select: {
        id: true,
        login: true,
      }
    });
  }
  /*
  * users
  * - Cette fonction permet de récupérer les utilisateurs en fonction des paramètres passés en argument
  * @param params : { skip?: number; take?: number; cursor?: Prisma.UserWhereUniqueInput; where?: Prisma.UserWhereInput; orderBy?: Prisma.UserOrderByWithRelationInput; }
  * @return Promise<User[]>
   */
  async users( params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Partial<User>[]> {
    const {skip, take, cursor, where, orderBy} = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        login: true,
        password: true,
        email: true,
      }
    });
  }






}
