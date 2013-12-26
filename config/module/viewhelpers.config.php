<?php
return array(
    'factories' => array (
        'hc-backend_jspackages' => function (Zend\View\HelperPluginManager $sm) {
            return $sm->getServiceLocator()
                      ->get('di')
                      ->get('HcBackend\View\Helper\JsPackages');
        }
    )
);
