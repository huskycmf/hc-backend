<?php
namespace HcBackend\Options;

use HcBackend\Options\Module\Packages;
use HcBackend\Stdlib\Provider\JsConfigInterface;
use Zend\Di\Di;
use Zend\Di\Exception\ClassNotFoundException;
use Zend\Stdlib\AbstractOptions;

class ModuleOptions extends AbstractOptions
    implements PackagesOptionsInterface, JsConfigProviderOptionsInterface, DojoJsConfigOptionsInterface
{
    /**
     * @var Packages
     */
    protected $packages = null;

    /**
     * @var array
     */
    protected $js;

    /**
     * @var JsConfigInterface[]
     */
    protected $jsConfigProviders = array();

    /**
     * @var Di
     */
    protected $di;

    /**
     * @param null | array $options
     */
    public function __construct($options = null, Di $di)
    {
        $this->di = $di;
        parent::__construct($options);
    }

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

    /**
     * @param array $js
     */
    public function setJs(array $js)
    {
        $this->js = $js;
    }

    /**
     * @return JsConfigInterface[]
     */
    public function getJsConfigProviders()
    {
        if (!empty($this->jsConfigProviders)) {
            return $this->jsConfigProviders;
        }

        if (empty($this->js['config']['providers'])) {
            throw new Exception\DomainException('In config options js array must have [config][providers]');
        }

        $providers = $this->js['config']['providers'];
        $this->jsConfigProviders = array();
        foreach ($providers as $provider) {
            try {
                $instance = $this->di->get(trim($provider));

                if (!$instance instanceof JsConfigInterface) {
                    throw new Exception\DomainException('Instance of provider must be compatible with JsConfigInterface');
                }
            } catch (ClassNotFoundException $ex) {
                throw new Exception\DomainException('Could not load js config provider '.$provider.', in options');
            }
            $this->jsConfigProviders[] = $instance;
        }

        return $this->jsConfigProviders;
    }

    /**
     * @return array
     */
    public function getDojoJsConfig()
    {
        if (empty($this->js['config']['dojo'])) return array();

        return $this->js['config']['dojo'];
    }
}
