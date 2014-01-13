<?php
namespace HcBackend\Service;

use HcBackend\Data\PageInterface;
use HcBackend\Entity\PageBindInterface;

interface PageBinderServiceInterface
{
    /**
     * @param PageInterface $pageData
     * @param PageBindInterface $pageBinder
     * @return void
     */
    public function bind(PageInterface $pageData, PageBindInterface $pageBinder);
}
