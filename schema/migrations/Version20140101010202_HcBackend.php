<?php

namespace Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration,
    Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your need!
 */
class Version20140101010202_HcBackend extends AbstractMigration
{
    public function up(Schema $schema)
    {
        $this->addSql('CREATE TABLE IF NOT EXISTS `image` (
                          `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
                          `token` varchar(150) NOT NULL,
                          `path` varchar(500) NOT NULL,
                          `http_path` varchar(250) NOT NULL,
                          `alt` varchar(250) NOT NULL,
                          `temporary` tinyint(1) unsigned NOT NULL,
                          `created_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          PRIMARY KEY (`id`),
                          UNIQUE KEY `token` (`token`),
                          KEY `resource_id` (`token`)
                        ) ENGINE=InnoDB');

        $this->addSql('CREATE TABLE IF NOT EXISTS `page` (
                        `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                        `content` text,
                        `keywords` varchar(300) DEFAULT NULL,
                        `description` varchar(300) DEFAULT NULL,
                        `title` varchar(300) DEFAULT NULL,
                        `url` varchar(100) DEFAULT NULL,
                        PRIMARY KEY (`id`)
                        ) ENGINE=InnoDB');

        $this->addSql('CREATE TABLE IF NOT EXISTS `alias` (
                          `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
                          `name` varchar(100) NOT NULL,
                          PRIMARY KEY (`id`),
                          UNIQUE KEY `name_UNIQUE` (`name`)
                        ) ENGINE=InnoDB');
    }

    public function down(Schema $schema)
    {
        $schema->dropTable('image');
        $schema->dropTable('page');
        $schema->dropTable('alias');
    }
}
