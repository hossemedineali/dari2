/*
  Warnings:

  - You are about to drop the column `type` on the `Post` table. All the data in the column will be lost.
  - Added the required column `announcementtype` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyType` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `type`,
    ADD COLUMN `announcementtype` VARCHAR(191) NOT NULL,
    ADD COLUMN `authername` VARCHAR(191) NOT NULL DEFAULT 'hossem edine ',
    ADD COLUMN `contact` VARCHAR(191) NOT NULL,
    ADD COLUMN `landtype` VARCHAR(191) NULL,
    ADD COLUMN `propertyType` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_PostToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PostToUser_AB_unique`(`A`, `B`),
    INDEX `_PostToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
