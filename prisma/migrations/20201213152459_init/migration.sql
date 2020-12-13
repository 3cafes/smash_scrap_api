-- CreateTable
CREATE TABLE `Player` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `player_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `img_blobl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
