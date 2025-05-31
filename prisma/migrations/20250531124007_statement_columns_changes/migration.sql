/*
  Warnings:

  - You are about to drop the column `solution` on the `Statement` table. All the data in the column will be lost.
  - Added the required column `body` to the `Statement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Statement" DROP COLUMN "solution",
ADD COLUMN     "body" TEXT NOT NULL,
ALTER COLUMN "message" DROP NOT NULL;
