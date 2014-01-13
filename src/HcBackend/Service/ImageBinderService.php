<?php
namespace HcBackend\Service;

use Doctrine\ORM\EntityManager;
use HcBackend\Data\ImageInterface;
use HcBackend\Entity\Image;
use HcBackend\Entity\ImageBindInterface;
use Zf2FileUploader\Resource\Handler\Remover\RemoverInterface;
use Zf2FileUploader\Service\Image\BindServiceInterface as BindServiceInterface;

class ImageBinderService implements ImageBinderServiceInterface
{
    /**
     * @var BindServiceInterface
     */
    protected $bindService;

    /**
     * @var RemoverInterface
     */
    protected $remover;

    /**
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * @param BindServiceInterface $bindService
     * @param RemoverInterface $remover
     * @param EntityManager $entityManager
     */
    public function __construct(BindServiceInterface $bindService,
                                RemoverInterface $remover,
                                EntityManager $entityManager)
    {
        $this->bindService = $bindService;
        $this->remover = $remover;
        $this->entityManager = $entityManager;
    }

    /**
     * @param ImageInterface $imageData
     * @param ImageBindInterface $imageBinder
     */
    public function bind(ImageInterface $imageData, ImageBindInterface $imageBinder)
    {
        $bindIds = array();

        /* @var $imageEntity Image */
        foreach ($imageBinder->getImage() as $imageEntity){
            $bindIds[$imageEntity->getId()] = $imageEntity;
        }

        foreach ($imageData->getResources() as $resource) {
            if (array_key_exists($resource->getEntity()->getId(), $bindIds)) {
                unset($bindIds[$resource->getEntity()->getId()]);
                continue;
            }
            $this->bindService->bind($resource, $imageBinder);
        }

        foreach ($bindIds as $imageEntity) {
            $this->remover->remove($imageEntity);
        }

        $this->entityManager->persist($imageBinder);
    }
}
