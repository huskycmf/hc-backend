<?php
namespace HcBackend\Entity;

interface PageBindInterface
{
    /**
     * @param PageInterface $pageEntity
     * @return $this
     */
    public function setPage(PageInterface $pageEntity);

    /**
     * @return PageInterface
     */
    public function getPage();
}
