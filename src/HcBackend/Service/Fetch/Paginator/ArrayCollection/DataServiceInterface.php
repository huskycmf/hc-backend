<?php
namespace HcBackend\Service\Fetch\Paginator\ArrayCollection;

use Doctrine\Common\Collections\ArrayCollection;
use HcBackend\Service\Fetch\Paginator\DataInterface;
use Zend\Stdlib\Parameters;

interface DataServiceInterface extends DataInterface
{
    /**
     * @param Parameters $params [OPTIONAL]
     * @return ArrayCollection
     */
    public function fetch(Parameters $params = null);
}
