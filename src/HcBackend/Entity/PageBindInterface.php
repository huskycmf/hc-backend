<?php
namespace HcBackend\Entity;

interface PageBindInterface
{
    /**
     * @param Page $pageEntity
     * @return PageBindInterface
     */
    public function setPage(Page $pageEntity);

    /**
     * @return Page
     */
    public function getPage();
}
