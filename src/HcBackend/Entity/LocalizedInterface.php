<?php
namespace HcBackend\Entity;

interface LocalizedInterface
{
    /**
     * @return LocaleInterface[]
     */
    public function getLocalized();
}
