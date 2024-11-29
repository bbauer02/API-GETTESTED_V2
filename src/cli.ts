// src/cli.ts
import { CommandFactory } from 'nest-commander';
import { SeedingModule } from './seeding/seeding.module';

async function bootstrap() {
  await CommandFactory.run(SeedingModule);
}

bootstrap();
