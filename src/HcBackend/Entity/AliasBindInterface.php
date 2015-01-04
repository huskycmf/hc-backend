<?php
namespace HcBackend\Entity;

interface AliasBindInterface
{
    /**
     * @param Alias $aliasEntity
     */
    public function setAlias(Alias $aliasEntity);

    /**
     * @return boolean
     */
    public function setIsPrimary($flag);
}
