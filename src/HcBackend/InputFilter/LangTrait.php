<?php
namespace HcBackend\InputFilter;

use Zend\Di\Di;

trait LangTrait
{
    /**
     * @return string
     */
    public function getLang()
    {
        return $this->getValue('lang');
    }
}
