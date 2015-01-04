<?php
namespace HcBackend\Service;

use HcBackend\Data\PageInterface;
use HcBackend\Entity\PageBindInterface;

interface PageBinderServiceInterface
{
    /**
     * @param PageInterface $pageData
     * @param PageBindInterface $pageBinder
     * @param string $customPageEntity
     */
    public function bind(PageInterface $pageData,
                         PageBindInterface $pageBinder,
                         $customPageEntity = 'HcBackend\Entity\Page');
}
