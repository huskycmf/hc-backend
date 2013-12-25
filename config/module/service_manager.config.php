<?php
use Zend\ServiceManager\ServiceManager;

return array(
    'factories' => array(
        'Zend\Mvc\Router\Http\TreeRouteStack' => function ($sm) {
            return $sm->get('router');
        }
    )
);
