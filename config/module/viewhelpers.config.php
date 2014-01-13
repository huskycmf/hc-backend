<?php
return array(
    'factories' => array (
        'hc_backend_dojojsconfig' => function (Zend\View\HelperPluginManager $sm) {
            return $sm->getServiceLocator()
                      ->get('di')
                      ->get('HcBackend\View\Helper\DojoJsConfig');
        },
        'hc_backend_huskyjsconfig' => function (Zend\View\HelperPluginManager $sm) {
            return $sm->getServiceLocator()
                      ->get('di')
                      ->get('HcBackend\View\Helper\HuskyJsConfig');
        }
    )
);
