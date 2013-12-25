<?php
namespace HcBackend\Controller\Collection;

use HcBackend\Data\DataMessagesInterface;
use HcBackend\Service\CommandInterface;
use HcBackend\Service\FetchServiceInterface;
use HcBackend\Service\ResourceCommandInterface;
use Zend\Mvc\MvcEvent;
use Zf2Libs\View\Model\Json\Specific\StatusMessageDataModelFactoryInterface;

class CommonResourceDataController extends AbstractCommonResourceController
{
    /**
     * @var DataMessagesInterface
     */
    protected $inputData;

    /**
     * @var StatusMessageDataModelFactoryInterface
     */
    protected $jsonResponseModelFactory;

    /**
     * @var CommandInterface
     */
    protected $serviceCommand;

    /**
     * @param DataMessagesInterface $inputData
     * @param ResourceCommandInterface $serviceCommand
     * @param FetchServiceInterface $fetchService
     * @param StatusMessageDataModelFactoryInterface $jsonResponseModelFactory
     */
    public function __construct(DataMessagesInterface $inputData,
                                ResourceCommandInterface $serviceCommand,
                                FetchServiceInterface $fetchService,
                                StatusMessageDataModelFactoryInterface $jsonResponseModelFactory)
    {
        parent::__construct($fetchService);

        $this->inputData = $inputData;
        $this->serviceCommand = $serviceCommand;
        $this->jsonResponseModelFactory = $jsonResponseModelFactory;
    }

    /**
     * @param MvcEvent $e
     * @return mixed|MvcEvent
     */
    public function onDispatch(MvcEvent $e)
    {
        if (!$this->inputData->isValid()) {
            return $e->setResult($this->jsonResponseModelFactory->getFailed($this->inputData));
        }

        $response = $this->serviceCommand->execute($this->resourceEntity);
        
        if ($response->isFailed()) {
            return $e->setResult($this->jsonResponseModelFactory->getFailed($response));
        }

        return $e->setResult($this->jsonResponseModelFactory->getSuccess());
    }
}
