<?php
namespace HcBackend\Service;

use Zend\Stdlib\Parameters;

interface FetchPaginatorDataServiceInterface
{
    /**
     * @param Parameters $params [OPTIONAL]
     * @return FetchCollectionServiceInterface | FetchQbBuilderServiceInterface
     */
    public function fetch(Parameters $params = null);
}
