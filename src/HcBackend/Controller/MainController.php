<?php
namespace HcBackend\Controller;

use HcBackend\Controller\AbstractController;
use HcBackend\Options\ModuleOptions;
use Zend\Mvc\MvcEvent;
use Zend\View\Model\ViewModel;

class MainController extends AbstractController
{
    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractActionController::onDispatch()
     */
    public function onDispatch(MvcEvent $e)
    {
        $viewModel = new ViewModel();
        $viewModel->setTemplate('index');
        $e->setResult($viewModel);
    }
}
