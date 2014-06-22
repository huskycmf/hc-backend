<?php

namespace Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration,
    Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your need!
 */
class Version20140101010201_HcBackend extends AbstractMigration
{
    public function up(Schema $schema)
    {
        $this->addSql('CREATE TABLE IF NOT EXISTS `role` (
                              `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                              `name` VARCHAR(48) NOT NULL,
                              PRIMARY KEY (`id`),
                              UNIQUE INDEX `name_UNIQUE` (`name` ASC))
                            ENGINE = InnoDB');

        $this->addSql('CREATE TABLE IF NOT EXISTS `role_has_role` (
                              `role_id` INT UNSIGNED NOT NULL,
                              `child_role_id` INT UNSIGNED NOT NULL,
                              PRIMARY KEY (`role_id`, `child_role_id`),
                              INDEX `fk_role_has_role_role1_idx` (`child_role_id` ASC),
                              INDEX `fk_role_has_role_role_idx` (`role_id` ASC),
                              CONSTRAINT `fk_role_has_role_role`
                                FOREIGN KEY (`role_id`)
                                REFERENCES `role` (`id`)
                                ON DELETE CASCADE
                                ON UPDATE CASCADE,
                              CONSTRAINT `fk_role_has_role_role1`
                                FOREIGN KEY (`child_role_id`)
                                REFERENCES `role` (`id`)
                                ON DELETE CASCADE
                                ON UPDATE CASCADE)
                            ENGINE = InnoDB');

        $this->addSql('CREATE TABLE IF NOT EXISTS `permission` (
                              `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                              `name` VARCHAR(128) NOT NULL,
                              PRIMARY KEY (`id`),
                              UNIQUE INDEX `name_UNIQUE` (`name` ASC))
                            ENGINE = InnoDB');

        $this->addSql('CREATE TABLE IF NOT EXISTS `role_has_permission` (
                              `role_id` INT UNSIGNED NOT NULL,
                              `permission_id` INT UNSIGNED NOT NULL,
                              PRIMARY KEY (`role_id`, `permission_id`),
                              INDEX `fk_role_has_permission_permission1_idx` (`permission_id` ASC),
                              INDEX `fk_role_has_permission_role1_idx` (`role_id` ASC),
                              CONSTRAINT `fk_role_has_permission_role1`
                                FOREIGN KEY (`role_id`)
                                REFERENCES `role` (`id`)
                                ON DELETE CASCADE
                                ON UPDATE CASCADE,
                              CONSTRAINT `fk_role_has_permission_permission1`
                                FOREIGN KEY (`permission_id`)
                                REFERENCES `permission` (`id`)
                                ON DELETE CASCADE
                                ON UPDATE CASCADE)
                            ENGINE = InnoDB');
        
        $this->addSql('CREATE TABLE IF NOT EXISTS `user` (
                          `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                          `display_name` VARCHAR(512) NOT NULL,
                          `username` VARCHAR(255) NOT NULL,
                          `email` VARCHAR(255) NOT NULL,
                          `password` VARCHAR(128) NOT NULL,
                          PRIMARY KEY (`id`),
                          UNIQUE INDEX `email_UNIQUE` (`email` ASC))
                        ENGINE = InnoDB');

        $this->addSql('CREATE TABLE IF NOT EXISTS `user_has_role` (
                          `user_id` INT UNSIGNED NOT NULL,
                          `role_id` INT UNSIGNED NOT NULL,
                          PRIMARY KEY (`user_id`, `role_id`),
                          INDEX `fk_user_has_role_role1_idx` (`role_id` ASC),
                          INDEX `fk_user_has_role_user1_idx` (`user_id` ASC),
                          CONSTRAINT `fk_user_has_role_user1`
                            FOREIGN KEY (`user_id`)
                            REFERENCES `user` (`id`)
                            ON DELETE CASCADE
                            ON UPDATE CASCADE,
                          CONSTRAINT `fk_user_has_role_role1`
                            FOREIGN KEY (`role_id`)
                            REFERENCES `role` (`id`)
                            ON DELETE CASCADE
                            ON UPDATE CASCADE)
                        ENGINE = InnoDB');

        $this->addSql('INSERT IGNORE INTO `user` (`id`, `username`, `email`, `password`) VALUES
                       (1, \'Primary Admin\', \'admin@husky.com\',
                        \'$2y$14$FE0jeYslbyoZ32Ce/WUD7eg6kB/xDHA02kBcRvHVUy.b/nCw4b1Oq\');');

        $this->addSql('INSERT IGNORE INTO `role` (`id`, `name`) VALUES (1, \'admin\'), (2, \'user\'), (3, \'guest\');');
        $this->addSql('INSERT IGNORE INTO `role_has_role` (`role_id`, `child_role_id`)  VALUES (2, 1);');
    }

    public function down(Schema $schema)
    {
        $schema->dropTable('role_has_permission');
        $schema->dropTable('role_has_role');
        $schema->dropTable('user_has_role');
        $schema->dropTable('role');
        $schema->dropTable('permission');
        $schema->dropTable('user');
    }
}
