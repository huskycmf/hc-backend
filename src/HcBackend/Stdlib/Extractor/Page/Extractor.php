<?php
namespace HcBackend\Stdlib\Extractor\Page;

use Zf2Libs\Stdlib\Extractor\ExtractorInterface;
use Zf2Libs\Stdlib\Extractor\Exception\InvalidArgumentException;
use HcBackend\Entity\Page as PageEntity;

class Extractor implements ExtractorInterface
{
    /**
     * Extract values from an object
     *
     * @param PageEntity $pageEntity
     * @param string $prefix
     * @throws \Zf2Libs\Stdlib\Extractor\Exception\InvalidArgumentException
     * @return array
     */
    public function extract($pageEntity)
    {
        if (!$pageEntity instanceof PageEntity) {
            throw new InvalidArgumentException("Expected HcBackend\\Entity\\Page object, invalid object given");
        }

        return array('pageTitle'    => $pageEntity->getTitle(),
                     'pageKeywords'  => $pageEntity->getKeywords(),
                     'pageDescription'  => $pageEntity->getDescription(),
                     'pageUrl'         => $pageEntity->getUrl());
    }
}
