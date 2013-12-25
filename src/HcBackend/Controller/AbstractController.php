<?php
namespace HcBackend\Controller;

use Zend\Mvc\MvcEvent;

abstract class AbstractController extends \Zend\Mvc\Controller\AbstractController
{
    protected function attachDefaultListeners()
    {
        parent::attachDefaultListeners();

        $this->getEventManager()->attach(MvcEvent::EVENT_DISPATCH, function (MvcEvent $event) {
            $event->getTarget()->layout('layout/hc-backend');
        });
    }
}
