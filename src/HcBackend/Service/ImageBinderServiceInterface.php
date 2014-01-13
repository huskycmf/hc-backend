<?php
namespace HcBackend\Service;

use HcBackend\Data\ImageInterface;
use HcBackend\Entity\ImageBindInterface;

interface ImageBinderServiceInterface
{
    /**
     * @param ImageInterface $imageData
     * @param ImageBindInterface $imageBinder
     */
    public function bind(ImageInterface $imageData, ImageBindInterface $imageBinder);
}
