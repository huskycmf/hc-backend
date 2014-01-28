<?php
namespace HcBackend\Entity;

use Doctrine\ORM\Mapping as ORM;

interface UserInterface extends \ZfcUser\Entity\UserInterface,
                                \Zf2SimpleAcl\Entity\UserInterface
{
    /**
     * Get id
     *
     * @return integer
     */
    public function getId();

    /**
     * Set username
     *
     * @param string $username
     * @return User
     */
    public function setUsername($username);

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername();

    /**
     * Set email
     *
     * @param string $email
     * @return User
     */
    public function setEmail($email);

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail();

    /**
     * Set displayName
     *
     * @param string $displayName
     * @return User
     */
    public function setDisplayName($displayName);

    /**
     * Get displayName
     *
     * @return string
     */
    public function getDisplayName();

    /**
     * Set password
     *
     * @param string $password
     * @return User
     */
    public function setPassword($password);

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword();

    /**
     * Set role
     *
     * @param integer $role
     * @return User
     */
    public function setRole($role);

    /**
     * Get role
     *
     * @return integer
     */
    public function getRole();
}
