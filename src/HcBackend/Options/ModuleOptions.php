<?php
namespace HcBackend\Options;

use HcBackend\Options\Module\Packages;
use Zend\Stdlib\AbstractOptions;

class ModuleOptions extends AbstractOptions implements PackagesOptionsInterface
{
    /**
     * @var Packages
     */
    protected $packages = null;

    /**
     * @param array $packages
     */
    public function setPackages(array $packages)
    {
        $this->packages = new Packages($packages);
    }

    /**
     * @return Packages
     */
    public function getPackages()
    {
        return $this->packages;
    }
}
