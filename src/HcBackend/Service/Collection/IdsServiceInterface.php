<?php
namespace HcBackend\Service\Collection;

use HcCore\Entity\EntityInterface;

interface IdsServiceInterface
{
    /**
     * @param array $ids
     * @return EntityInterface[]
     */
    public function fetch(array $ids);
}
