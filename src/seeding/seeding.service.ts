// src/seeding/seeding.service.ts
import { Injectable } from '@nestjs/common';
import { Civility, Gender, PrismaClient } from '@prisma/client';
import { countries, instituts, roles, users as fixedusers } from './datas/';
import { faker } from '@faker-js/faker/locale/fr';

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

const civilityMap = {
  1: Civility.MR,
  2: Civility.MRS,
  3: Civility.MISS,
};

const genderMap = {
  1: Gender.Male,
  2: Gender.Female,
  3: Gender.Other,
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
    console.log(`${colors.blue}⏳Seeding countries...${colors.reset}`);
    // On transforme les données du pays pour matcher notre modèle
    const formattedCountries = countries.map(country => ({
      label: country.en_short_name,
      nationality: country.nationality,
      language: country.en_short_name.split(',')[0], // Simplification pour l'exemple
      code: country.alpha_2_code,
    }));

    const createdCountries = await this.prisma.country.createMany({
      data: formattedCountries,
      skipDuplicates: true,
    });
    console.log(
      `${colors.cyan}..........Created ${createdCountries.count} countries${colors.reset}✔️`,
    );
  }

  private async seedInstituts() {
    console.log(`${colors.blue}⏳Seeding instituts...${colors.reset}`);
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

    const createdInstituts = await this.prisma.institut.createMany({
      data: formattedInstituts,
      skipDuplicates: true,
    });
    console.log(
      `${colors.cyan}..........Created ${createdInstituts.count} instituts${colors.reset}✔️`,
    );
  }

  private async generateRandomUsers(count: number) {
    console.log(
      `${colors.cyan}..........Generating ${count} random users🎲 ${colors.reset}`,
    );
    const users = Array(count)
      .fill(null)
      .map(() => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const login = faker.internet
          .username({ firstName: firstName, lastName: lastName })
          .toLowerCase();
        const email = faker.internet
          .email({ firstName: firstName, lastName: lastName })
          .toLowerCase();

        return {
          login: login,
          email: email,
          password: faker.internet.password(),
          phone: faker.phone.number(),
          gender: faker.helpers.arrayElement([1, 2, 3]), // Utilise vos mappings existants
          civility: faker.helpers.arrayElement([1, 2, 3]), // Utilise vos mappings existants
          firstname: firstName,
          lastname: lastName,
          adress1: faker.location.streetAddress(),
          adress2: faker.helpers.maybe(
            () => faker.location.secondaryAddress(),
            {
              probability: 0.3,
            },
          ),
          zipcode: faker.location.zipCode(),
          city: faker.location.city(),
          country_id: faker.helpers.rangeToNumber({
            min: 1,
            max: countries.length,
          }),
          nationality_id: faker.helpers.rangeToNumber({
            min: 1,
            max: countries.length,
          }),
          firstlanguage_id: faker.helpers.rangeToNumber({
            min: 1,
            max: countries.length,
          }),
          nativecountry_id: faker.helpers.rangeToNumber({
            min: 1,
            max: countries.length,
          }),
          birthday: faker.date.between({
            from: '1960-01-01',
            to: '2000-12-31',
          }),
          systemRole_id: faker.helpers.arrayElement([1]), // Rôles existants
        };
      });

    return users;
  }

  private async seedIntitutUsers() {
    console.log(`${colors.blue}⏳Seeding Users of Intituts...${colors.reset}`);
    // D'abord, récupérer tous les users et instituts existants
    const users = await this.prisma.user.findMany();
    const instituts = await this.prisma.institut.findMany();

    const institutUsers = users.flatMap(user => {
      // Générer un nombre aléatoire d'affiliations, pour le moment 1 institut par user
      const numAffiliations = faker.number.int({ min: 1, max: 1 });
      const selectedInstituts = faker.helpers.arrayElements(
        instituts,
        numAffiliations,
      ); // Sélectionne un institut aléatoire
      return selectedInstituts.map(institut => {
        let roleId = 1; // Rôle par défaut

        if (
          user.email === 'bbauer02@gmail.com' ||
          user.email === 'umebosi1014@yahoo.co.jp'
        ) {
          roleId = 5; // sys admin
        } else if (
          fixedusers.some(fixedUser => fixedUser.email === user.email)
        ) {
          roleId = 4; // admin of instituts
        }

        return {
          userId: user.id,
          institutId: institut.id,
          roleId,
        };
      });
    });

    const createdInstitutUsers = await this.prisma.institutUser.createMany({
      data: institutUsers,
      skipDuplicates: true,
    });

    console.log(
      `${colors.cyan}..........Created ${createdInstitutUsers.count} associations of Users with Instituts  ${colors.reset}✔️`,
    );
  }

  async seedUsers() {
    console.log(`${colors.blue}⏳Seeding users...${colors.reset}`);
    const fixedUsers = fixedusers.map(user => ({
      login: user.login,
      email: user.email,
      password: user.password,
      phone: user.phone,
      civility: civilityMap[user.civility] || Civility.MR,
      gender: genderMap[user.gender] || Gender.Male,
      firstname: user.firstname,
      lastname: user.lastname,
      adress1: user.adress1,
      adress2: user.adress2 || null,
      zipcode: user.zipcode,
      city: user.city,
      countryId: user.country_id,
      nativeCountryId: user.nativecountry_id,
      nationalityId: user.nationality_id,
      firstLanguageId: user.firstlanguage_id,
      birthday: user.birthday,
      systemRoleId: user.systemRole_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const randomUsers = await this.generateRandomUsers(10);

    const formattedRandomUsers = randomUsers.map(user => ({
      login: user.login,
      email: user.email,
      password: user.password,
      phone: user.phone,
      civility: civilityMap[user.civility] || Civility.MR,
      gender: genderMap[user.gender] || Gender.Male,
      firstname: user.firstname,
      lastname: user.lastname,
      adress1: user.adress1,
      adress2: user.adress2 || null,
      zipcode: user.zipcode,
      city: user.city,
      countryId: user.country_id,
      nativeCountryId: user.nativecountry_id,
      nationalityId: user.nationality_id,
      firstLanguageId: user.firstlanguage_id,
      birthday: user.birthday,
      systemRoleId: user.systemRole_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Combine les deux tableaux
    const allUsers = [...fixedUsers, ...formattedRandomUsers];

    const createdUsers = await this.prisma.user.createMany({
      data: allUsers,
      skipDuplicates: true,
    });

    console.log(
      `${colors.cyan}..........Created ${createdUsers.count} users (${fixedUsers.length} fixed + ${randomUsers.length} random)${colors.reset}✔️`,
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
      await this.seedUsers();
      await this.seedIntitutUsers();
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
