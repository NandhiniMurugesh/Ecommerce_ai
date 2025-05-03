/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `brand` VARCHAR(191) NULL,
    ADD COLUMN `category` VARCHAR(191) NULL,
    ADD COLUMN `image2` VARCHAR(191) NULL,
    ADD COLUMN `image3` VARCHAR(191) NULL,
    ADD COLUMN `image4` VARCHAR(191) NULL,
    ADD COLUMN `offers` VARCHAR(191) NULL,
    ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `warranty` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `clerkId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_clerkId_key` ON `User`(`clerkId`);
