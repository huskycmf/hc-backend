<?php
namespace HcBackend\Entity;

interface AliasBindAwareInterface
{
    /**
     * @return AliasBindInterface[]
     */
    public function getAlias();

    /**
     * @param AliasBindInterface $aliasEntity
     */
    public function addAlias(AliasBindInterface $aliasEntity);
}
