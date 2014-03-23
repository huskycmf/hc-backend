<?php
namespace HcBackend\Data\Collection\Entities;

use HcCore\Entity\EntityInterface;

interface ByIdsInterface
{
    /**
     * @return EntityInterface[]
     */
    public function getEntities();
}
