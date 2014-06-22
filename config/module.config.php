<?php
return array(
    'router' => include __DIR__ . '/module/router.config.php',
    'view_helpers'=> include __DIR__ . '/module/viewhelpers.config.php',

    'zfc_rbac' => [
        /**
         * Key that is used to fetch the identity provider
         *
         * Please note that when an identity is found,
         * it MUST implements the ZfcRbac\Identity\IdentityProviderInterface
         * interface, otherwise it will throw an exception.
         */
         'identity_provider' => 'ZfcRbac\Identity\AuthenticationIdentityProvider',

        /**
         * Set the guest role
         *
         * This role is used by the authorization service when the authentication service returns no identity
         */
         'guest_role' => 'guest',

        /**
         * Set the guards
         *
         * You must comply with the various options of guards. The format must be of the following format:
         *
         *      'guards' => [
         *          'ZfcRbac\Guard\RouteGuard' => [
         *              // options
         *          ]
         *      ]
         */
        'guards' => [
            'ZfcRbac\Guard\RouteGuard' => [
                'hc-backend/user/login*' => [ 'guest' ],
                'hc-backend/user/logout*' => [ 'admin' ],
                'hc-backend*' => [ 'admin' ],
            ]
        ],

        /**
         * As soon as one rule for either route or controller is specified, a guard will be automatically
         * created and will start to hook into the MVC loop.
         *
         * If the protection policy is set to DENY, then any route/controller will be denied by
         * default UNLESS it is explicitly added as a rule. On the other hand, if it is set to ALLOW, then
         * not specified route/controller will be implicitly approved.
         *
         * DENY is the most secure way, but it is more work for the developer
         */
        // 'protection_policy' => \ZfcRbac\Guard\GuardInterface::POLICY_ALLOW,

        'protection_policy' => \ZfcRbac\Guard\GuardInterface::POLICY_DENY,

        'role_provider' => [
            'ZfcRbac\Role\ObjectRepositoryRoleProvider' => [
                'object_manager'     => 'doctrine.entitymanager.orm_default',
                'class_name'         => 'HcBackend\Entity\HierarchicalRole',
                'role_name_property' => 'name'
            ]
        ],

        /**
         * Configure the unauthorized strategy. It is used to render a template whenever a user is unauthorized
         */
        'unauthorized_strategy' => [
            /**
             * Set the template name to render
             */
            // 'template' => 'error/403'
        ],

        /**
         * Configure the redirect strategy. It is used to redirect the user to another route when a user is
         * unauthorized
         */
        'redirect_strategy' => [
            /**
             * Enable redirection when the user is connected
             */
             'redirect_when_connected' => false,

            /**
             * Set the route to redirect when user is connected (of course, it must exist!)
             */
//             'redirect_to_route_connected' => 'hc-backend',

            /**
             * Set the route to redirect when user is disconnected (of course, it must exist!)
             */
             'redirect_to_route_disconnected' => 'hc-backend',

            /**
             * If a user is unauthorized and redirected to another route (login, for instance), should we
             * append the previous URI (the one that was unauthorized) in the query params?
             */
             'append_previous_uri' => true,

            /**
             * If append_previous_uri option is set to true, this option set the query key to use when
             * the previous uri is appended
             */
             'previous_uri_query_key' => 'redirectTo'
        ],

        /**
         * Various plugin managers for guards and role providers. Each of them must follow a common
         * plugin manager config format, and can be used to create your custom objects
         */
        // 'guard_manager'               => [],
        // 'role_provider_manager'       => []
    ],

    'zfcuser' => array(
        'user_entity_class' => 'HcBackend\Entity\User',
        'auth_adapters' => array( 100 => 'ZfcUser\Authentication\Adapter\Db' ),
        'enable_default_entities' => false
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

    'zf2fileuploader' => array(
        'enable_default_entities' => false
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
