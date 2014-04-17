<?php
namespace HcBackend\Service\Alias;

interface FetchLocalizedServiceInterface
{
    /**
     * @param string $alias
     * @return \HcBackend\Entity\LocalizedInterface | null
     */
    public function fetch($alias);
}
