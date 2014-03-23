<?php
namespace HcBackend\InputFilter;

trait PageTrait
{
    /**
     * @return string
     */
    public function getUrl()
    {
        return $this->getValue('pageUrl');
    }

    /**
     * @return string
     */
    public function getMetaDescription()
    {
        return $this->getValue('pageDescription');
    }

    /**
     * @return string
     */
    public function getMetaKeywords()
    {
        return $this->getValue('pageKeywords');
    }

    /**
     * @return string
     */
    public function getMetaTitle()
    {
        return $this->getValue('pageTitle');
    }
}
