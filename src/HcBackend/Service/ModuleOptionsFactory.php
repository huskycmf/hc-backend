<?php
namespace HcBackend\Service;

use HcBackend\Options\ModuleOptions;
use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class ModuleOptionsFactory implements FactoryInterface
{
    public function createService(ServiceLocatorInterface $services)
    {
        $config = $services->get('Configuration');
        $moduleOption = new ModuleOptions(isset($config['hc-backend']) ?
                                                $config['hc-backend'] : array(),
                                          $services->get('di'));

        return $moduleOption;
    }
}
