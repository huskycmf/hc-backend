<?php
namespace HcBackend\Service\Alias;

use Doctrine\ORM\EntityManagerInterface;
use HcBackend\Data\AliasInterface;
use HcBackend\Entity\Alias as AliasEntity;
use HcBackend\Entity\AliasBindAwareInterface;
use HcBackend\Entity\AliasBindInterface;
use HcCore\Entity\EntityInterface;

class AliasBinderService implements AliasBinderServiceInterface
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param AliasInterface $aliasData
     * @param AliasBindAwareInterface $aliasBinder
     * @param AliasBindInterface $aliasBinderEntity
     */
    public function bind(AliasInterface $aliasData,
                         AliasBindAwareInterface $aliasBinder,
                         AliasBindInterface $aliasBinderEntity)
    {
        foreach ($aliasBinder->getAlias() as $aliasEntity) {
            $this->entityManager->remove($aliasEntity);
        }

        $newAliasName = $aliasData->getAlias();

        $aliasEntity = $this->entityManager
                                ->getRepository('HcBackend\Entity\Alias')
                                ->findOneBy(array('name'=>$newAliasName));

        if (!$aliasEntity) {
            $aliasEntity = new AliasEntity();
            $aliasEntity->setName($newAliasName);
            $this->entityManager->persist($aliasEntity);
            $this->entityManager->flush();
        }

        $aliasBinderEntity->setAlias($aliasEntity);
    }
}
