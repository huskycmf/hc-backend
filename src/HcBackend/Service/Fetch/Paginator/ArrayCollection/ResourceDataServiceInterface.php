<?php
namespace HcBackend\Service\Fetch\Paginator\ArrayCollection;

use Doctrine\Common\Collections\ArrayCollection;
use HcBackend\Entity\EntityInterface;
use HcBackend\Service\Fetch\Paginator\ResourceDataInterface;
use Zend\Stdlib\Parameters;
use HcBackend\Service\Fetch\Paginator\Exception\InvalidResourceExceptionInterface;

interface ResourceDataServiceInterface extends ResourceDataInterface
{
    /**
     * @param mixed | EntityInterface $resource
     * @param Parameters $params [OPTIONAL]
     * @return ArrayCollection
     * @throws InvalidResourceExceptionInterface
     */
    public function fetch($resource, Parameters $params = null);
}
