<?php
namespace HcBackend\Service;

use HcBackend\Entity\EntityInterface;
use Zf2Libs\Stdlib\Service\Response\Messages\Response;

interface ResourceCommandInterface
{
    /**
     * @param EntityInterface $resource
     * @return Response
     */
    public function execute(EntityInterface $resource);
}
