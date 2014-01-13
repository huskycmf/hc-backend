<?php
namespace HcBackend\Stdlib\Provider;

use HcBackend\Options\DojoJsConfigOptionsInterface;
use HcBackend\Options\PackagesOptionsInterface;

class JsDojoConfig implements JsDojoConfigInterface
{
    /**
     * @var array
     */
    protected $dojoConfig = array();

    /**
     * @param PackagesOptionsInterface $packages
     */
    public function __construct(DojoJsConfigOptionsInterface $dojoConfigOptions)
    {
        $this->dojoConfig = $dojoConfigOptions->getDojoJsConfig();
    }

    /**
     * @return array
     */
    public function getDojoConfig()
    {
        return $this->dojoConfig;
    }
}

