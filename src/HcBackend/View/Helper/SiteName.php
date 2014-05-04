<?php
namespace HcBackend\View\Helper;

use HcBackend\Options\JsConfigProviderOptionsInterface;
use HcBackend\Options\ModuleOptions;
use HcBackend\Stdlib\Provider\JsDojoConfigInterface;
use Zend\Di\Di;
use Zend\Json\Json;
use Zend\View\Helper\AbstractHelper;

class SiteName extends AbstractHelper
{
    /**
     * @var ModuleOptions
     */
    protected $moduleOptions;

    public function __construct(ModuleOptions $moduleOptions)
    {
        $this->moduleOptions = $moduleOptions;
    }

    public function __invoke()
    {
        return $this->moduleOptions->getSiteName();
    }
}

