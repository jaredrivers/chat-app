/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "permissions" "Permissions"[] DEFAULT ARRAY['USER']::"Permissions"[];

-- DropEnum
DROP TYPE "Role";
