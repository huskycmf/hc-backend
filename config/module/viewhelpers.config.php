<?php
return array(
    'factories' => array (
        'hc_backend_dojoJsConfig' => function (Zend\View\HelperPluginManager $sm) {
            return $sm->getServiceLocator()
                      ->get('di')
                      ->get('HcBackend\View\Helper\DojoJsConfig');
        },
        'hc_backend_huskyJsConfig' => function (Zend\View\HelperPluginManager $sm) {
            return $sm->getServiceLocator()
                      ->get('di')
                      ->get('HcBackend\View\Helper\HuskyJsConfig');
        },

        'hc_backend_siteName' => function (Zend\View\HelperPluginManager $sm) {
            return $sm->getServiceLocator()
                      ->get('di')
                      ->get('HcBackend\View\Helper\SiteName');
        }
    )
);
