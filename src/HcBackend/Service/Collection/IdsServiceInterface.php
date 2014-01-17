<?php
namespace HcBackend\Service\Collection;

use HcBackend\Entity\EntityInterface;

interface IdsServiceInterface
{
    /**
     * @param array $ids
     * @return EntityInterface[]
     */
    public function fetch(array $ids);
}
