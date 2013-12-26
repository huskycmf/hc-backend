<?php
namespace HcBackend\Options;

use HcBackend\Options\Module\Packages;

interface PackagesOptionsInterface
{
    /**
     * @return Packages
     */
    public function getPackages();
}
