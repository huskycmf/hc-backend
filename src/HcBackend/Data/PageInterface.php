<?php

namespace HcBackend\Data;

interface PageInterface
{
    /**
     * @return string
     */
    public function getMetaDescription();

    /**
     * @return string
     */
    public function getMetaKeywords();

    /**
     * @return string
     */
    public function getMetaTitle();

    /**
     * @return string
     */
    public function getUrl();
}
