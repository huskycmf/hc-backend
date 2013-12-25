<?php
namespace HcBackend\Service;

use Doctrine\ORM\QueryBuilder;
use Zend\Stdlib\Parameters;

interface FetchQbBuilderServiceInterface extends FetchPaginatorDataServiceInterface
{
    /**
     * @param Parameters $params [OPTIONAL]
     * @return QueryBuilder
     */
    public function fetch(Parameters $params = null);
}
