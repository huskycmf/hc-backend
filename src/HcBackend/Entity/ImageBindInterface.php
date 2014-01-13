<?php
namespace HcBackend\Entity;

use Zf2FileUploader\Entity\ImageInterface;

interface ImageBindInterface extends \Zf2FileUploader\Entity\ImageBindInterface
{
    /**
     * @return ImageInterface
     */
    public function getImage();
}
