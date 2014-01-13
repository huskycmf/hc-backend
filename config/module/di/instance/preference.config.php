<?php
return array(
    'Zend\EventManager\EventManagerInterface' =>
    'EventManager',

    'Zend\ServiceManager\ServiceLocatorInterface' =>
    'ServiceManager',

    'HcBackend\Service\PageBinderServiceInterface' =>
    'HcBackend\Service\PageBinderService',

    'HcBackend\Service\ImageBinderServiceInterface' =>
    'HcBackend\Service\ImageBinderService',

    'HcBackend\Data\User\LoginDataInterface' =>
    'HcBackend\Data\User\Login',

    'HcBackend\Service\Sorting\SortingServiceInterface' =>
    'HcBackend\Service\Sorting\SortingService',

    'HcBackend\Service\Filtration\Query\FiltrationServiceInterface' =>
    'HcBackend\Service\Filtration\Query\FiltrationService',

    'HcBackend\Service\Filtration\Collection\FiltrationServiceInterface' =>
    'HcBackend\Service\Filtration\Collection\FiltrationService',

    'HcBackend\Options\PackagesOptionsInterface' => 'HcBackend\Options\ModuleOptions',
    'HcBackend\Options\JsConfigProviderOptionsInterface' => 'HcBackend\Options\ModuleOptions',
    'HcBackend\Options\DojoJsConfigOptionsInterface' => 'HcBackend\Options\ModuleOptions',

    'HcBackend\Stdlib\Provider\JsDojoConfigInterface' => 'HcBackend\Stdlib\Provider\JsPackages',
    'HcBackend\Stdlib\Provider\JsHuskyConfigInterface' => 'HcBackend\Stdlib\Provider\JsPackages'
);
