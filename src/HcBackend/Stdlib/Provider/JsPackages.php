<?php
namespace HcBackend\Stdlib\Provider;

use HcBackend\Options\Module\Package;
use HcBackend\Options\PackagesOptionsInterface;
use HcBackend\Stdlib\Provider\JsDojoConfigInterface;
use HcBackend\Stdlib\Provider\JsHuskyConfigInterface;

class JsPackages implements JsDojoConfigInterface, JsHuskyConfigInterface
{
    /**
     * @var Package[]
     */
    protected $packages;

    /**
     * @var array
     */
    protected $huskyConfig = array();

    /**
     * @var array
     */
    protected $dojoConfig = array();

    /**
     * @param PackagesOptionsInterface $packages
     */
    public function __construct(PackagesOptionsInterface $packages)
    {
        $this->packages = array_filter((array)$packages->getPackages(), function (Package $package){
            return $package->isJs();
        });

        $this->huskyConfig = array('packages'=>array('content'=>array(),
                                                     'rounded'=>array(),
                                                     'toolbar'=>array()));

        $dojoPackages = array(array('name' => 'hc-backend',
                                    'location' => '/js/src/hc-backend'),
                              array('name' => 'history',
                                    'location' =>
                                    '/vendor/history.js/scripts/bundled-uncompressed/html4+html5'));

        $this->dojoConfig = array('packages'=> $dojoPackages);

        foreach ($this->packages as $package) {
            if (!array_key_exists($package->getType(), $this->huskyConfig['packages'])) {
                $this->huskyConfig['packages'][$package->getType()] = array();
            }
            $this->huskyConfig['packages'][$package->getType()][] = $package->getName();
            $this->dojoConfig['packages'][] = array('name'=>$package->getName(),
                                                    'location'=>$package->getHttpPath());
        }
    }

    /**
     * @return array
     */
    public function getDojoConfig()
    {
        return $this->dojoConfig;
    }

    /**
     * @return array
     */
    public function getHuskyConfig()
    {
        return $this->huskyConfig;
    }
}

