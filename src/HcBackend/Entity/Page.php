<?php
namespace HcBackend\Entity;

use Doctrine\ORM\Mapping as ORM;
use HcCore\Entity\EntityInterface;

/**
 * Page
 *
 * @ORM\Table(name="page")
 * @ORM\Entity
 */
class Page extends MappedPage implements EntityInterface {}
