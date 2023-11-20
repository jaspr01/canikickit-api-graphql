/*
  Warnings:

  - You are about to drop the column `duration` on the `TimesheetEntry` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TimesheetEntry` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `TimesheetEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hours` to the `TimesheetEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LegalForm" AS ENUM ('BV', 'COMM_V', 'CV', 'NV', 'SOLE_PROPRIETORSHIP', 'VOF', 'VZW');

-- CreateEnum
CREATE TYPE "VatPercentage" AS ENUM ('SIX', 'TWELVE', 'TWENTY_ONE', 'ZERO');

-- DropForeignKey
ALTER TABLE "TimesheetEntry" DROP CONSTRAINT "TimesheetEntry_userId_fkey";

-- AlterTable
ALTER TABLE "TimesheetEntry" DROP COLUMN "duration",
DROP COLUMN "userId",
ADD COLUMN     "clientId" UUID,
ADD COLUMN     "companyId" UUID NOT NULL,
ADD COLUMN     "hours" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "invoiceId" UUID;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyId" UUID NOT NULL,
ADD COLUMN     "function" TEXT,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "enterpriseNumber" TEXT NOT NULL,
    "legalForm" "LegalForm" NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "box" TEXT,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "enterpriseNumber" TEXT NOT NULL,
    "legalForm" "LegalForm" NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "box" TEXT,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "companyId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" UUID NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "companyId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "InvoiceLine" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "subTotal" DECIMAL(65,30) NOT NULL,
    "vatPercentage" "VatPercentage" NOT NULL,
    "vat" DECIMAL(65,30) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "invoiceId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_id_key" ON "Company"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_id_key" ON "Invoice"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceLine_id_key" ON "InvoiceLine"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceLine" ADD CONSTRAINT "InvoiceLine_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimesheetEntry" ADD CONSTRAINT "TimesheetEntry_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimesheetEntry" ADD CONSTRAINT "TimesheetEntry_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimesheetEntry" ADD CONSTRAINT "TimesheetEntry_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
