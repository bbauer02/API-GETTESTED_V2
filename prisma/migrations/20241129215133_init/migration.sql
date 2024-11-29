-- CreateEnum
CREATE TYPE "Civility" AS ENUM ('MR', 'MRS', 'MISS');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateTable
CREATE TABLE "Country" (
    "country_id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "Institut" (
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

    CONSTRAINT "Institut_pkey" PRIMARY KEY ("institut_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "power" INTEGER NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
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

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_label_key" ON "Country"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Institut_label_key" ON "Institut"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Role_label_key" ON "Role"("label");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Institut" ADD CONSTRAINT "Institut_country_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_country_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_nativecountry_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_nationality_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_firstlanguage_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_systemrole_fkey" FOREIGN KEY ("systemrole_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
