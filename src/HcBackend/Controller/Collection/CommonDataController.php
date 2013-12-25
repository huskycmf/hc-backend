<?php
namespace HcBackend\Controller\Collection;

use HcBackend\Controller\AbstractController;
use HcBackend\Data\DataMessagesInterface;
use HcBackend\Service\CommandInterface;
use Zend\Mvc\MvcEvent;
use Zf2Libs\View\Model\Json\Specific\StatusMessageDataModelFactoryInterface;

class CommonDataController extends AbstractController
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
     * @param CommandInterface $serviceCommand
     * @param StatusMessageDataModelFactoryInterface $jsonResponseModelFactory
     */
    public function __construct(DataMessagesInterface $inputData,
                                CommandInterface $serviceCommand,
                                StatusMessageDataModelFactoryInterface $jsonResponseModelFactory)
    {
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

        $response = $this->serviceCommand->execute();
        
        if ($response->isFailed()) {
            return $e->setResult($this->jsonResponseModelFactory->getFailed($response));
        }

        return $e->setResult($this->jsonResponseModelFactory->getSuccess());
    }
}
