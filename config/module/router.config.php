<?php
return array(
    'routes' => array(
        'hc-backend' => array(
            'type' => 'literal',
            'priority' =>5000,
            'options' => array(
                'route' => '/superman',
                'defaults' => array(
                    'controller' => 'HcBackend\Controller\MainController'
                )
            ),
            'may_terminate' => true,
            'child_routes' => array(
                'images' => include __DIR__ . '/router/images.config.php',

                'main' => array(
                    'type' => 'regex',
                    'priority' => -5,
                    'options' => array(
                        'regex' => '(?<segment>.+)?',
                        'defaults' => array(
                            'controller' => 'HcBackend\Controller\MainController'
                        ),
                        'spec'=>''
                    ),
                ),
                'user' => include __DIR__ . '/router/user.config.php'
            )
        )
    )
);
