import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SeedingModule } from './seeding/seeding.module';

@Module({
  imports: [
    SeedingModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
