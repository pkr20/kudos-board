/*
  Warnings:

  - Made the column `category` on table `Board` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "category" SET NOT NULL;
