<?php
return array(
    'router' => include __DIR__ . '/module/router.config.php',
    'view_helpers'=> include __DIR__ . '/module/viewhelpers.config.php',

    'zf2simpleacl' => array(
        'restriction_strategy' => 'permissive',

        'redirect_route' => array('hc-backend' => 'hc-backend/user/login/form'),

        'routes' => array(
            'hc-backend' => array('admin'=>true, false),
            'hc-backend/user/login' => array('admin'=>false, true),
            'hc-backend/user/logout' => array('admin'=>true, false)
        ),

        'roles' => array('admin'=>array('name'=>'admin', 'id'=>\HcBackend\Entity\User::ROLE_ADMIN))
    ),

    'zfcuser' => array(
        'enable_user_state' => true,
        'default_user_state' => \HcBackend\Entity\User::STATE_UNCONFIRMED,
        'allowed_login_states' => array( \HcBackend\Entity\User::STATE_CONFIRMED ),
        'user_entity_class' => 'HcBackend\Entity\User',
        'auth_adapters' => array( 100 => 'ZfcUser\Authentication\Adapter\Db' )
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

    'hc-backend'=> array(
        'js' => array(
            'config' => array(
                'dojo' => array(
                    'parseOnLoad'=>true,
                    'locale'=>'ru-ru',
                    'waitSeconds'=>10,
                    'cacheBust'=>true,
                    'async'=>true
                ),
                'providers' => array(
                    'HcBackend-Packages' => 'HcBackend\Stdlib\Provider\JsPackages',
                    'HcBackend-DojoConfig' => 'HcBackend\Stdlib\Provider\JsDojoConfig'
                )
            )
        )
    ),

    'asset_manager' => array(
        'resolver_configs' => array(
            'paths' => array(
                'HcBackend' => __DIR__ . '/../public',
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
          'ViewJsonStrategy'
        )
    )
);
