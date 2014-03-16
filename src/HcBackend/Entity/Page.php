<?php
namespace HcBackend\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Page
 *
 * @ORM\Table(name="page")
 * @ORM\Entity
 */
class Page extends MappedPage implements EntityInterface {}
