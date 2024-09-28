-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BookType" AS ENUM ('FICTION', 'NON_FICTION');

-- CreateEnum
CREATE TYPE "BookInstanceStatus" AS ENUM ('AVAILABLE', 'RENTED', 'DAMAGED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('BORROW', 'RETURN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "type" "BookType" NOT NULL,
    "genre" TEXT NOT NULL,
    "briefContent" TEXT NOT NULL,
    "description" TEXT,
    "enable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookInstance" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "barcode" TEXT NOT NULL,
    "status" "BookInstanceStatus" NOT NULL,
    "bookCondition" TEXT NOT NULL,
    "rentedOut" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" TIMESTAMP(3),
    "location" TEXT NOT NULL,

    CONSTRAINT "BookInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookTransaction" (
    "tid" TEXT NOT NULL,
    "transactionNumber" TEXT NOT NULL,
    "bookInstanceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "dueDate" TIMESTAMP(3),
    "returnDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookTransaction_pkey" PRIMARY KEY ("tid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "BookInstance_barcode_key" ON "BookInstance"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "BookTransaction_tid_key" ON "BookTransaction"("tid");

-- CreateIndex
CREATE UNIQUE INDEX "BookTransaction_transactionNumber_key" ON "BookTransaction"("transactionNumber");

-- CreateIndex
CREATE INDEX "BookTransaction_bookInstanceId_userId_idx" ON "BookTransaction"("bookInstanceId", "userId");

-- AddForeignKey
ALTER TABLE "BookInstance" ADD CONSTRAINT "BookInstance_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookTransaction" ADD CONSTRAINT "BookTransaction_bookInstanceId_fkey" FOREIGN KEY ("bookInstanceId") REFERENCES "BookInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookTransaction" ADD CONSTRAINT "BookTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
