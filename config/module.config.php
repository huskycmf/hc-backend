<?php
return array(
    'router' => include __DIR__ . '/module/router.config.php',
    'view_helpers'=> include __DIR__ . '/module/viewhelpers.config.php',

    'bjyauthorize' => array(

        // set the 'guest' role as default (must be defined in a role provider)
        'default_role' => 'guest',

        /* this module uses a meta-role that inherits from any roles that should
         * be applied to the active user. the identity provider tells us which
         * roles the "identity role" should inherit from.
         *
         * for ZfcUser, this will be your default identity provider
         */
        'identity_provider' => 'BjyAuthorize\Provider\Identity\ZfcUserZendDb',

        /* role providers simply provide a list of roles that should be inserted
         * into the Zend\Acl instance. the module comes with two providers, one
         * to specify roles in a config file and one to load roles using a
         * Zend\Db adapter.
         */
        'role_providers' => array(

            /* here, 'guest' and 'user are defined as top-level roles, with
             * 'admin' inheriting from user
             */
            'BjyAuthorize\Provider\Role\Config' => array(
                'guest' => array(),
                'user'  => array('children' => array(
                    'admin' => array(),
                ))
            )
        ),
        'guards' => array(
            'BjyAuthorize\Guard\Route' => array(
                array('route' => 'hc-backend', 'roles' => array('admin')),
                array('route' => 'hc-backend/user/login', 'roles' => array('guest')),
                array('route' => 'hc-backend/user/logout', 'roles' => array('guest'))
            )
        )
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
        'site_name' => '',
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
                    'HcBackend-DojoConfig' => 'HcBackend\Stdlib\Provider\JsDojoConfig',
                    'HcBackend-JsLocales' => 'HcBackend\Stdlib\Provider\JsLocales'
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
