<?php
namespace HcBackend\Stdlib\Extractor\Page;

use HcBackend\Entity\PageInterface;
use Zf2Libs\Stdlib\Extractor\ExtractorInterface;
use Zf2Libs\Stdlib\Extractor\Exception\InvalidArgumentException;

class Extractor implements ExtractorInterface
{
    /**
     * Extract values from an object
     *
     * @param PageInterface $pageEntity
     * @param string $prefix
     * @throws \Zf2Libs\Stdlib\Extractor\Exception\InvalidArgumentException
     * @return array
     */
    public function extract($pageEntity)
    {
        if (!$pageEntity instanceof PageInterface) {
            throw new InvalidArgumentException("Expected HcBackend\\Entity\\PageInterface object, invalid object given");
        }

        return array('pageTitle'    => $pageEntity->getTitle(),
                     'pageKeywords'  => $pageEntity->getKeywords(),
                     'pageDescription'  => $pageEntity->getDescription(),
                     'pageUrl'         => $pageEntity->getUrl());
    }
}
