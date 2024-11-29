/*
  Warnings:

  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Institut` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Institut" DROP CONSTRAINT "Institut_country_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_country_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_firstlanguage_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_nationality_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_nativecountry_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_systemrole_fkey";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "Institut";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "countries" (
    "country_id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "instituts" (
    "institut_id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "adress1" TEXT NOT NULL,
    "adress2" TEXT,
    "zipcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "siteweb" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "socialNetwork" JSONB NOT NULL,
    "stripe_id" TEXT NOT NULL,
    "stripe_activated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "instituts_pkey" PRIMARY KEY ("institut_id")
);

-- CreateTable
CREATE TABLE "institut_users" (
    "institut_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institut_users_pkey" PRIMARY KEY ("institut_id","user_id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "power" INTEGER NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "avatar" TEXT,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "civility" "Civility" NOT NULL,
    "gender" "Gender" NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "adress1" TEXT NOT NULL,
    "adress2" TEXT,
    "zipcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    "nativecountry_id" INTEGER NOT NULL,
    "nationality_id" INTEGER NOT NULL,
    "firstlanguage_id" INTEGER NOT NULL,
    "birthday" DATE,
    "systemrole_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_label_key" ON "countries"("label");

-- CreateIndex
CREATE UNIQUE INDEX "instituts_label_key" ON "instituts"("label");

-- CreateIndex
CREATE UNIQUE INDEX "roles_label_key" ON "roles"("label");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "instituts" ADD CONSTRAINT "Institut_country_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institut_users" ADD CONSTRAINT "institut_users_institut_id_fkey" FOREIGN KEY ("institut_id") REFERENCES "instituts"("institut_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institut_users" ADD CONSTRAINT "institut_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "User_country_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "User_nativecountry_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "User_nationality_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "User_firstlanguage_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "User_systemrole_fkey" FOREIGN KEY ("systemrole_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
