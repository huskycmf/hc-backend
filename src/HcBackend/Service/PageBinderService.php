<?php
namespace HcBackend\Service;

use Doctrine\ORM\EntityManagerInterface;
use HcBackend\Data\PageInterface;
use HcBackend\Entity\PageBindInterface;
use HcBackend\Entity\Page as PageEntity;

class PageBinderService implements PageBinderServiceInterface
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param PageInterface $pageData
     * @param PageBindInterface $pageBinder
     * @param string $customPageEntity
     */
    public function bind(PageInterface $pageData,
                         PageBindInterface $pageBinder,
                         $customPageEntity = 'HcBackend\Entity\Page')
    {
        if (!in_array('HcBackend\Entity\PageInterface', class_implements($customPageEntity))) {
            throw new \InvalidArgumentException("Invalid customPageEntity in PageBinderService");
        }

        $pageEntity = $pageBinder->getPage();

        if (is_null($pageEntity)) {
            if (strlen($pageData->getMetaDescription()) ||
                strlen($pageData->getMetaKeywords()) ||
                strlen($pageData->getMetaTitle()) ||
                strlen($pageData->getUrl())) {
                $pageEntity = new $customPageEntity();
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
