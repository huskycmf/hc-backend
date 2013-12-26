<?php
namespace HcBackend\Options\Module;

use HcBackend\Options\Exception;

class Packages extends \ArrayObject
{
    /**
     * @param array $configPackageSection
     */
    public function __construct($configPackageSection)
    {
       $this->preparePackages($configPackageSection);
    }

    /**
     * @param array $packagesConfig
     */
    protected function preparePackages(array $packagesConfig)
    {
        foreach ($packagesConfig as $packageName=>$packageConfig) {
            $package = new Package($packageName, $packageConfig);
            $this->append($package);
        }
    }
}
