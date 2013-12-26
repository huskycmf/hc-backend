<?php
namespace HcBackend\View\Helper;

use Doctrine\Common\Collections\Criteria;
use HcBackend\Options\Module\Package;
use HcBackend\Options\Module\Packages;
use HcBackend\Options\PackagesOptionsInterface;
use Zend\View\Helper\AbstractHelper;

class JsPackages extends AbstractHelper
{
    /**
     * @var Packages
     */
    protected $packages;

    /**
     * @param PackagesOptionsInterface $packages
     */
    public function __construct(PackagesOptionsInterface $packages)
    {
        $this->packages = array_filter((array)$packages->getPackages(), function (Package $package){
            return $package->isJs();
        });
    }

    /**
     * @return Package[]
     */
    public function __invoke()
    {
        return $this->packages;
    }
}

