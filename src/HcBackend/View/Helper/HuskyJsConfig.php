<?php
namespace HcBackend\View\Helper;

use HcBackend\Options\JsConfigProviderOptionsInterface;
use HcBackend\Stdlib\Provider\JsHuskyConfigInterface;
use Zend\Di\Di;
use Zend\Json\Json;
use Zend\View\Helper\AbstractHelper;

class HuskyJsConfig extends AbstractHelper
{
    /**
     * @var JsHuskyConfigInterface[]
     */
    protected $providers;

    /**
     * @param JsConfigProviderOptionsInterface $providers
     */
    public function __construct(JsConfigProviderOptionsInterface $providers)
    {
        $this->providers = array_filter($providers->getJsConfigProviders(), function ($provider) {
            return $provider instanceof JsHuskyConfigInterface;
        });;
    }

    /**
     * @param array $config [OPTIONAL]
     * @return string
     */
    public function __invoke(array $config = array())
    {
        $config = array();

        foreach ($this->providers as $provider) {
            $config = array_merge_recursive($config, $provider->getHuskyConfig());
        }

        return 'huskyConfig = '.Json::encode($config);
    }
}

