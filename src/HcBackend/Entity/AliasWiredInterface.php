<?php
namespace HcBackend\Entity;

interface AliasWiredInterface
{
    /**
     * @return Alias
     */
    public function getAlias();

    /**
     * @return boolean
     */
    public function getIsPrimary();
}
