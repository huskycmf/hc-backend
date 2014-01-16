<?php
namespace HcBackend\Controller\Common\Collection;

use HcBackend\Service\CommandInterface;
use HcBackend\Service\FetchServiceInterface;
use HcBackend\Service\ResourceCommandInterface;
use Zend\Mvc\MvcEvent;
use Zf2Libs\View\Model\Json\Specific\StatusMessageDataModelFactoryInterface;

class ResourceDeleteController extends AbstractResourceController
{
    /**
     * @var StatusMessageDataModelFactoryInterface
     */
    protected $jsonResponseModelFactory;

    /**
     * @var CommandInterface
     */
    protected $serviceCommand;

    /**
     * @param ResourceCommandInterface $serviceCommand
     * @param FetchServiceInterface $fetchService
     * @param StatusMessageDataModelFactoryInterface $jsonResponseModelFactory
     */
    public function __construct(ResourceCommandInterface $serviceCommand,
                                FetchServiceInterface $fetchService,
                                StatusMessageDataModelFactoryInterface $jsonResponseModelFactory)
    {
        parent::__construct($fetchService);

        $this->serviceCommand = $serviceCommand;
        $this->jsonResponseModelFactory = $jsonResponseModelFactory;
    }

    /**
     * @param MvcEvent $e
     * @return mixed|MvcEvent
     */
    public function onDispatch(MvcEvent $e)
    {
        $response = $this->serviceCommand->execute($this->resourceEntity);

        if ($response->isFailed()) {
            return $e->setResult($this->jsonResponseModelFactory->getFailed($response));
        }

        return $e->setResult($this->jsonResponseModelFactory->getSuccess());
    }
}
