<?php
namespace HcBackend\Service\Sorting;

use Doctrine\ORM\QueryBuilder;
use Zend\Stdlib\Parameters;

interface SortingServiceInterface
{
    /**
     * @param Parameters $params
     * @param QueryBuilder $qb
     * @param string $tableAlias
     * @return QueryBuilder
     */
    public function apply(Parameters $params, QueryBuilder $qb, $tableAlias = '');
}
