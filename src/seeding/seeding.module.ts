// src/seeding/seeding.module.ts
import { Module } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { SeedCommand } from './commands/seed.command';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [SeedingService, SeedCommand, PrismaClient],
})
export class SeedingModule {}
