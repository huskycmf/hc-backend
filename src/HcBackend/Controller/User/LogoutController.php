<?php
namespace HcBackend\Controller\User;

use Zend\Authentication\AuthenticationService;
use Zend\Mvc\Controller\AbstractController;
use Zend\Mvc\MvcEvent;
use ZfcUser\Authentication\Adapter\AdapterChain;

class LogoutController extends AbstractController
{
    /**
     * @var AdapterChain
     */
    protected $adapterChain;

    /**
     * @var AuthenticationService
     */
    protected $authService;

    public function __construct(AdapterChain $adapterChain,
                                AuthenticationService $authService)
    {
        $this->authAdapter = $adapterChain;
        $this->authService = $authService;
    }

    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractActionController::onDispatch()
     */
    public function onDispatch(MvcEvent $e)
    {
        $this->authAdapter->resetAdapters();
        $this->authAdapter->logoutAdapters();

        $this->authService->clearIdentity();

        $e->setResult($this->redirect()->toRoute('hc-backend/user/login/form'));
    }
}
