<?php
namespace HcBackend\Service;

use Doctrine\ORM\EntityManager;
use HcBackend\Data\PageInterface;
use HcBackend\Entity\PageBindInterface;
use HcBackend\Entity\Page as PageEntity;

class PageBinderService implements PageBinderServiceInterface
{
    /**
     * @var EntityManager
     */
    protected $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param PageInterface $pageData
     * @param PageBindInterface $pageBinder
     */
    public function bind(PageInterface $pageData, PageBindInterface $pageBinder)
    {
        $pageEntity = $pageBinder->getPage();

        if (is_null($pageEntity)) {
            if (strlen($pageData->getMetaDescription()) ||
                strlen($pageData->getMetaKeywords()) ||
                strlen($pageData->getMetaTitle()) ||
                strlen($pageData->getUrl())) {
                $pageEntity = new PageEntity();
            } else {
                return;
            }
        }

        $this->entityManager->persist($pageBinder);
        $this->entityManager->persist($pageEntity);

        $pageEntity->setDescription($pageData->getMetaDescription());
        $pageEntity->setKeywords($pageData->getMetaKeywords());
        $pageEntity->setTitle($pageData->getMetaTitle());
        $pageEntity->setUrl(strlen($pageData->getUrl()) ? $pageData->getUrl() : NULL);
        $pageBinder->setPage($pageEntity);
    }
}
