/*
  Warnings:

  - Added the required column `keyName` to the `PublicKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PublicKey" ADD COLUMN     "keyName" TEXT NOT NULL;
