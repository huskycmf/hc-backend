<?php
namespace HcBackend\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Entity
 * @ORM\Table(name="user")
 */
class User extends MappedUser
{
    const STATE_CONFIRMED = 1;
    const STATE_UNCONFIRMED = 2;
    const STATE_RESET = 3;

    const ROLE_ADMIN = 1;
}
