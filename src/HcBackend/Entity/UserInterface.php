<?php
namespace App\Entity;

interface UserInterface extends \ZfcUser\Entity\UserInterface
{
    /**
     * Get role
     *
     * @return int
     */
    public function getRole();
}