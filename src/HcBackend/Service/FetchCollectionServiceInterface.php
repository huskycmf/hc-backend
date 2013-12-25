<?php
namespace HcBackend\Service;

use Doctrine\Common\Collections\ArrayCollection;
use Zend\Stdlib\Parameters;

interface FetchCollectionServiceInterface extends FetchPaginatorDataServiceInterface
{
    /**
     * @param Parameters $params [OPTIONAL]
     * @return ArrayCollection
     */
    public function fetch(Parameters $params = null);
}
