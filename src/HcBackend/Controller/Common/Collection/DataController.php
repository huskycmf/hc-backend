<?php
namespace HcBackend\Controller\Common\Collection;

use HcBackend\Controller\AbstractController;
use HcBackend\Data\DataMessagesInterface;
use HcBackend\Service\CommandInterface;
use Zend\Mvc\MvcEvent;
use Zf2Libs\Stdlib\Response\DataInterface;
use Zf2Libs\View\Model\Json\Specific\StatusMessageDataModelFactoryInterface;

class DataController extends AbstractController
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
     * @param DataMessagesInterface $inputData [OPTIONAL]
     * @param CommandInterface $serviceCommand
     * @param StatusMessageDataModelFactoryInterface $jsonResponseModelFactory
     */
    public function __construct(DataMessagesInterface $inputData = null,
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
        if (!is_null($this->inputData) && !$this->inputData->isValid()) {
            return $e->setResult($this->jsonResponseModelFactory->getFailed($this->inputData));
        }

        $response = $this->serviceCommand->execute();
        
        if ($response->isFailed()) {
            return $e->setResult($this->jsonResponseModelFactory->getFailed($response));
        }

        return $e->setResult($this->jsonResponseModelFactory
                                  ->getSuccess($response instanceof DataInterface ? $response : null));
    }
}
