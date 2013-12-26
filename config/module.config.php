<?php
return array(
    'router' => include __DIR__ . '/module/router.config.php',
    'view_helpers'=> include __DIR__ . '/module/viewhelpers.config.php',
    'controller_plugins' => array(
        'invokables' => array(
            'Params' => 'Zf2Libs\Mvc\Controller\Plugin\Params'
        )
    ),

    'zf2simpleacl' => array(
        'restriction_strategy' => 'permissive',

        'redirect_route' => array('hc-backend' => 'hc-backend/user/login/form'),

        'routes' => array(
            'hc-backend' => array('admin'=>true, false),
            'hc-backend/user/login' => array('admin'=>false, true),
            'hc-backend/user/logout' => array('admin'=>true, false)
        ),

        'roles' => array('admin'=>array('name'=>'admin', 'id'=>5678))
    ),

    'doctrine' => array(
        'driver' => array(
            'app_driver' => array(
                'paths' => array(__DIR__ . '/../src/HcBackend/Entity')
            ),
            'orm_default' => array('drivers' => array('HcBackend\Entity' => 'app_driver'))
        )
    ),

    'service_manager' => include __DIR__ . '/module/service_manager.config.php',
    'di' => include __DIR__ . '/module/di.config.php',

    'asset_manager' => array(
        'resolver_configs' => array(
            'paths' => array(
                'HcBackend' => __DIR__ . '/../public',
            )
        )
    ),

    'translator' => array (
        'translation_file_patterns' => array (
            'HcBackend' => array (
                'type'     => 'gettext',
                'base_dir' => __DIR__ . '/../language',
                'pattern'  => '%s.mo'
            )
        )
    ),

    'view_manager' => array(
        'template_map' => array(
            'layout/hc-backend'       => __DIR__ . '/../view/layout/layout.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/exception'         => __DIR__ . '/../view/error/exception.phtml',
            'error/403'               => __DIR__ . '/../view/error/403.phtml'
        ),

        'template_path_stack' => array(
            'hc-backend' => __DIR__ . '/../view',
        ),

        'strategies' => array(
          'Zf2Libs\View\Strategy\UploaderStrategy',
          'ViewJsonStrategy',
        )
    )
);
