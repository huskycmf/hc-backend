<?php
namespace HcBackend\Service;

use Doctrine\ORM\EntityManager;
use HcBackend\Entity\EntityInterface;

class FetchService implements FetchServiceInterface
{
    /**
     * @var \Doctrine\ORM\EntityManager
     */
    protected $entityManager;

    /**
     * @var string
     */
    protected $entityName;

    /**
     * @param EntityManager $entityManager
     * @param string $entityName
     */
    public function __construct(EntityManager $entityManager,
                                $entityName)
    {
        $this->entityManager = $entityManager;
        $this->entityName = $entityName;
    }

    /**
     * @param mixed $id
     * @return EntityInterface | null
     */
    public function fetch($id)
    {
        return $this->entityManager->find($this->entityName, $id);
    }
}
