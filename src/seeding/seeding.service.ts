// src/seeding/seeding.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { countries, roles, instituts } from './datas/';

// Définition des couleurs
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

@Injectable()
export class SeedingService {
  constructor(private prisma: PrismaClient) {}

  private async seedRoles() {
    console.log(`${colors.blue}⏳Seeding roles...${colors.reset}`);
    const createdRoles = await this.prisma.role.createMany({
      data: roles,
      skipDuplicates: true,
    });
    console.log(
      `${colors.cyan}..........Created ${createdRoles.count} roles${colors.reset}✔️`,
    );
  }

  private async seedCountries() {
    // On transforme les données du pays pour matcher notre modèle
    const formattedCountries = countries.map(country => ({
      label: country.en_short_name,
      nationality: country.nationality,
      language: country.en_short_name.split(',')[0], // Simplification pour l'exemple
      code: country.alpha_2_code,
    }));

    console.log(`${colors.blue}⏳Seeding countries...${colors.reset}`);
    const createdCountries = await this.prisma.country.createMany({
      data: formattedCountries,
      skipDuplicates: true,
    });
    console.log(
      `${colors.cyan}..........Created ${createdCountries.count} countries${colors.reset}✔️`,
    );
  }

  private async seedInstituts() {
    // On transforme les données du pays pour matcher notre modèle
    const formattedInstituts = instituts.map(institut => ({
      label: institut.label,
      adress1: institut.adress1,
      adress2: institut.adress2,
      zipcode: institut.zipcode,
      city: institut.city,
      countryId: institut.country_id,
      email: institut.email,
      siteweb: institut.siteweb,
      phone: institut.phone,
      socialNetwork: institut.socialNetwork,
      stripeId: institut.stripeId,
      stripeActivated: institut.stripeActivated,
    }));

    console.log(`${colors.blue}⏳Seeding instituts...${colors.reset}`);
    const createdInstituts = await this.prisma.institut.createMany({
      data: formattedInstituts,
      skipDuplicates: true,
    });
    console.log(
      `${colors.cyan}..........Created ${createdInstituts.count} instituts${colors.reset}✔️`,
    );
  }

  // Méthode principale pour exécuter tous les seeds
  async seedAll() {
    try {
      console.log(
        `💾 ${colors.yellow} Initialisation de la base de données... ${colors.reset}`,
      );
      await this.seedRoles();
      await this.seedCountries();
      await this.seedInstituts();
      console.log(
        `✅ ${colors.green}Base de données initialisée avec succès ! ${colors.reset}`,
      );
    } catch (error) {
      console.error(
        `❌ ${colors.red}Erreur lors de l'initialisation de la base de données: ${colors.reset}`,
        error,
      );
    }
  }
}
