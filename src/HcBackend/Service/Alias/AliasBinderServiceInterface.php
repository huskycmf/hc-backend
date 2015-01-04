<?php
namespace HcBackend\Service\Alias;

use HcBackend\Data\AliasInterface;
use HcBackend\Entity\AliasBindAwareInterface;
use HcBackend\Entity\AliasBindInterface;

interface AliasBinderServiceInterface
{
    /**
     * @param AliasInterface $aliasData
     * @param AliasBindAwareInterface $aliasBinder
     * @param AliasBindInterface $aliasBinderEntity
     */
    public function bind(AliasInterface $aliasData,
                         AliasBindAwareInterface $aliasBinder,
                         AliasBindInterface $aliasBindInterface);
}
