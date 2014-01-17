<?php
namespace HcBackend\Data\Collection\Entities;

use HcBackend\Entity\EntityInterface;

interface ByIdsInterface
{
    /**
     * @return EntityInterface[]
     */
    public function getEntities();
}
