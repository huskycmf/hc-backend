<?php
namespace HcBackend\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MappedUser
 *
 * @ORM\Table(name="user")
 * @ORM\MappedSuperclass
 */
class MappedUser implements \ZfcUser\Entity\UserInterface,
                            \Zf2SimpleAcl\Entity\UserInterface
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false, options={"unsigned"=true})
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", length=255, nullable=true)
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="photo", type="string", length=500, nullable=false)
     */
    private $photo = '';

    /**
     * @var string
     *
     * @ORM\Column(name="phone", type="string", length=200, nullable=false)
     */
    private $phone = '';

    /**
     * @var string
     *
     * @ORM\Column(name="display_name", type="string", length=50, nullable=true)
     */
    private $displayName;

    /**
     * @var integer
     *
     * @ORM\Column(name="role", type="smallint", nullable=true, options={"unsigned"=true})
     */
    private $role;

    /**
     * @var integer
     *
     * @ORM\Column(name="state", type="smallint", nullable=true, options={"unsigned"=true})
     */
    private $state;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=128, nullable=false)
     */
    private $password;

    /**
     * @var string
     *
     * @ORM\Column(name="confirmation_code", type="string", length=128, nullable=false)
     */
    private $confirmationCode;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="reset_code_timestamp", type="datetime", nullable=false)
     */
    private $resetCodeTimestamp;

    /**
     * @var string
     *
     * @ORM\Column(name="reset_code", type="string", length=128, nullable=false)
     */
    private $resetCode;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set id
     *
     * @param int $id
     * @return User
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Set username
     *
     * @param string $username
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set displayName
     *
     * @param string $displayName
     * @return User
     */
    public function setDisplayName($displayName)
    {
        $this->displayName = $displayName;

        return $this;
    }

    /**
     * Get displayName
     *
     * @return string
     */
    public function getDisplayName()
    {
        return $this->displayName;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set state
     *
     * @param integer $state
     * @return User
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * Get state
     *
     * @return integer
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set role
     *
     * @param integer $role
     * @return User
     */
    public function setRole($role)
    {
        $this->role = $role;
        return $this;
    }

    /**
     * Get role
     *
     * @return integer
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * Set photo
     *
     * @param string $photo
     * @return User
     */
    public function setPhoto($photo)
    {
        $this->photo = $photo;

        return $this;
    }

    /**
     * Get photo
     *
     * @return string 
     */
    public function getPhoto()
    {
        return $this->photo;
    }

    /**
     * Set phone
     *
     * @param string $phone
     * @return User
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return string 
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set confirmationCode
     *
     * @param string $confirmationCode
     * @return User
     */
    public function setConfirmationCode($confirmationCode)
    {
        $this->confirmationCode = $confirmationCode;

        return $this;
    }

    /**
     * Get confirmationCode
     *
     * @return string 
     */
    public function getConfirmationCode()
    {
        return $this->confirmationCode;
    }

    /**
     * Set resetCode
     *
     * @param string $resetCode
     * @return User
     */
    public function setResetCode($resetCode)
    {
        $this->resetCode = $resetCode;

        return $this;
    }

    /**
     * Get resetCode
     *
     * @return string 
     */
    public function getResetCode()
    {
        return $this->resetCode;
    }

    /**
     * Set resetCodeTimestamp
     *
     * @param \DateTime $resetCodeTimestamp
     * @return User
     */
    public function setResetCodeTimestamp($resetCodeTimestamp)
    {
        $this->resetCodeTimestamp = $resetCodeTimestamp;

        return $this;
    }

    /**
     * Get resetCodeTimestamp
     *
     * @return \DateTime 
     */
    public function getResetCodeTimestamp()
    {
        return $this->resetCodeTimestamp;
    }
}
