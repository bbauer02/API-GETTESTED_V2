// src/seeding/commands/seed.command.ts
import { Command, CommandRunner } from 'nest-commander';
import { SeedingService } from '../seeding.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@Command({
  name: 'db:seed',
  description: 'Seed the database with initial data',
})
export class SeedCommand extends CommandRunner {
  // Hériter de CommandRunner
  constructor(private readonly seedingService: SeedingService) {
    super();
  }

  async run(): Promise<void> {
    try {
      await this.seedingService.seedAll();
    } catch (error) {
      console.error('Failed to seed database:', error);
      process.exit(1);
    }
  }
}
