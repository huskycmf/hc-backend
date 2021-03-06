<?php
namespace HcBackend\Service\Fetch\Paginator\QueryBuilder;

use Doctrine\ORM\QueryBuilder;
use HcCore\Entity\EntityInterface;
use HcBackend\Service\Fetch\Paginator\ResourceDataInterface;
use Zend\Stdlib\Parameters;

interface ResourceDataServiceInterface extends ResourceDataInterface
{
    /**
     * @param mixed | EntityInterface $resource
     * @param Parameters $params [OPTIONAL]
     * @return QueryBuilder
     */
    public function fetch($resource, Parameters $params = null);
}
