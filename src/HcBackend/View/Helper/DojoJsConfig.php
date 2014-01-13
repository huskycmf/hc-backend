<?php
namespace HcBackend\View\Helper;

use HcBackend\Options\JsConfigProviderOptionsInterface;
use HcBackend\Stdlib\Provider\JsDojoConfigInterface;
use Zend\Di\Di;
use Zend\Json\Json;
use Zend\View\Helper\AbstractHelper;

class DojoJsConfig extends AbstractHelper
{
    /**
     * @var JsDojoConfigInterface[]
     */
    protected $providers = array();

    /**
     * @var array
     */
    protected $dojoConfig = array();

    /**
     * @param JsConfigProviderOptionsInterface $providers
     * @param JsDojoConfigInterface $dojoConfig
     */
    public function __construct(JsConfigProviderOptionsInterface $providers, JsDojoConfigInterface $dojoConfig)
    {
        $this->providers = array_filter($providers->getJsConfigProviders(), function ($provider) {
            return $provider instanceof JsDojoConfigInterface;
        });

        $this->dojoConfig = $dojoConfig->getDojoConfig();
    }

    /**
     * @param array $config [OPTIONAL]
     * @return string
     */
    public function __invoke(array $extendingConfig = array())
    {
        $config = $this->dojoConfig;

        foreach ($this->providers as $provider) {
            $config = array_merge_recursive($config, $provider->getDojoConfig());
        }

        $config = array_merge_recursive($config, $extendingConfig);

        return 'dojoConfig = '.Json::encode($config);
    }
}

