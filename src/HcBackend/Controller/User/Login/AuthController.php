<?php
namespace HcBackend\Controller\User\Login;

use HcCore\Service\AuthService;
use HcBackend\Controller\AbstractController;
use HcBackend\Data\User\LoginDataInterface;
use Zend\I18n\Translator\Translator;
use Zend\Mvc\MvcEvent;
use Zend\Stdlib\ResponseInterface as Response;
use Zf2Libs\View\Model\Json\Specific\StatusMessageDataModelFactory;

class AuthController extends AbstractController
{
    /**
     * @var StatusMessageDataModelFactory
     */
    protected $jsonResponseFactory;

    /**
     * @var Translator
     */
    protected $translator;

    /**
     * @var AuthService
     */
    protected $authService;

    /**
     * @var LoginDataInterface
     */
    protected $loginData;

    /**
     * @param StatusMessageDataModelFactory $jsonResponseFactory
     * @param Translator $translator
     * @param AuthService $authService
     * @param LoginDataInterface $loginData
     */
    public function __construct(StatusMessageDataModelFactory $jsonResponseFactory,
                                Translator $translator,
                                AuthService $authService,
                                LoginDataInterface $loginData)
    {
        $this->jsonResponseFactory = $jsonResponseFactory;
        $this->translator = $translator;
        $this->authService = $authService;
        $this->loginData = $loginData;
    }

    /**
     * @param MvcEvent $e
     * @return mixed|\Zend\Http\Response | Response
     */
    public function onDispatch(MvcEvent $e)
    {
        if (!$this->loginData->isValid()) {
            return $e->setResult(
                        $this->jsonResponseFactory->getFailed($this->loginData));
        }

        $result = $this->authService->authorize($this->getRequest());

        if ($result instanceof Response || $result === false) {
            return $e->setResult($this->jsonResponseFactory->getFailed());
        }

        return $e->setResult($this->jsonResponseFactory->getSuccess());
    }
}
