<?php
return array(
    'type' => 'literal',
    'options' => array(
        'route' => '/images'
    ),
    'may_terminate' => false,
    'child_routes' => array (
        'create' => array(
            'type' => 'method',
            'options' => array(
                'verb' => 'post',
                'defaults' => array(
                    'controller' => 'HcBackend-Controller-Images-Create'
                )
            )
        ),

        'image' => array(
            'type' => 'segment',
            'options' => array(
                'route' => '/:token',
                'constraints' => array( 'token' => '[a-zA-Z0-9_]+' )
            ),
            'may_terminate' => false,
            'child_routes' => array(
                'remove' => array(
                    'type' => 'method',
                    'options' => array(
                        'verb' => 'delete',
                        'defaults' => array(
                            'controller' => 'HcBackend\Controller\Image\RemoveController'
                        )
                    )
                )
            )
        )
    )
);
