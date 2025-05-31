-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CREATED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "Statement" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'CREATED',
    "theme" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "solution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Statement_id_key" ON "Statement"("id");
