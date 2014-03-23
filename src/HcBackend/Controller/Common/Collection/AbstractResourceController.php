<?php
namespace HcBackend\Controller\Common\Collection;

use HcBackend\Controller\AbstractController;
use HcCore\Entity\EntityInterface;
use HcBackend\Service\FetchServiceInterface;
use Zend\Mvc\MvcEvent;
use Zend\Stdlib\RequestInterface as Request;
use Zend\Stdlib\ResponseInterface as Response;
use Zend\Http\PhpEnvironment\Response as HttpResponse;

abstract class AbstractResourceController extends AbstractController
{
    /**
     * @var FetchServiceInterface
     */
    protected $fetchService;

    /**
     * @var EntityInterface
     */
    protected $resourceEntity;

    /**
     * @param FetchServiceInterface $fetchService
     */
    public function __construct(FetchServiceInterface $fetchService)
    {
        $this->fetchService = $fetchService;
    }

    /* (non-PHPdoc)
     * @see \Zend\Mvc\Controller\AbstractController::dispatch()
     */
    public function dispatch(Request $request, Response $response = null)
    {
        $this->resourceEntity = $this->fetchService
                                     ->fetch($this->params()
                                     ->fromRoute('id'));

        if (is_null($this->resourceEntity)) {
            $response = $response ?: new HttpResponse();
            $this->getEventManager()->clearListeners(MvcEvent::EVENT_DISPATCH);
            $response->setStatusCode(404);
        }

        return parent::dispatch($request, $response);
    }
}
