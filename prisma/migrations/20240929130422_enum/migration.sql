/*
  Warnings:

  - The values [AVAILABLE,RENTED,DAMAGED] on the enum `BookInstanceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [FICTION,NON_FICTION] on the enum `BookType` will be removed. If these variants are still used in the database, this will fail.
  - The values [BORROW,RETURN] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.
  - The values [USER,ADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookInstanceStatus_new" AS ENUM ('available', 'rented', 'damaged');
ALTER TABLE "BookInstance" ALTER COLUMN "status" TYPE "BookInstanceStatus_new" USING ("status"::text::"BookInstanceStatus_new");
ALTER TYPE "BookInstanceStatus" RENAME TO "BookInstanceStatus_old";
ALTER TYPE "BookInstanceStatus_new" RENAME TO "BookInstanceStatus";
DROP TYPE "BookInstanceStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "BookType_new" AS ENUM ('fiction', 'non_fiction');
ALTER TABLE "Book" ALTER COLUMN "type" TYPE "BookType_new" USING ("type"::text::"BookType_new");
ALTER TYPE "BookType" RENAME TO "BookType_old";
ALTER TYPE "BookType_new" RENAME TO "BookType";
DROP TYPE "BookType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('borrow', 'return');
ALTER TABLE "BookTransaction" ALTER COLUMN "transactionType" TYPE "TransactionType_new" USING ("transactionType"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('user', 'admin');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';
