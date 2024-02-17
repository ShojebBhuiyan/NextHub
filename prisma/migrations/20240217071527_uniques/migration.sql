/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_userId_key" ON "Project"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
