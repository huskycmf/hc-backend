<?php

namespace HcBackend\Data;

use Zf2FileUploader\Resource\Persisted\ImageResourceInterface;

interface ImageInterface
{
    /**
     * @return ImageResourceInterface[]
     */
    public function getResources();
}
