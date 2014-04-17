<?php
namespace HcBackend\Entity;

interface AliasWiredAwareInterface
{
    /**
     * @return AliasWiredInterface[]
     */
    public function getAlias();
}
