<?php
namespace HcBackend\Data;

use Zend\Di\Di;
use Zend\Filter\UriNormalize;
use Zend\InputFilter\InputFilter;
use Zend\Validator\StringLength;
use Zend\Validator\Uri;

class Page extends InputFilter implements PageInterface
{
    public function __construct(Di $di)
    {
        $input = $di->get('Zend\InputFilter\Input', array('name'=>'pageDescription'));
        $input->getValidatorChain()
              ->attach(new StringLength(array('max'=>'300')));
        $input->setAllowEmpty(true);
        $this->add($input);

        $input = $di->get('Zend\InputFilter\Input', array('name'=>'pageKeywords'));
        $input->getValidatorChain()
              ->attach(new StringLength(array('max'=>'300')));
        $input->setAllowEmpty(true);
        $this->add($input);

        $input = $di->get('Zend\InputFilter\Input', array('name'=>'pageTitle'));
        $input->getValidatorChain()
              ->attach(new StringLength(array('max'=>'300')));
        $input->setAllowEmpty(true);
        $this->add($input);

        $input = $di->get('Zend\InputFilter\Input', array('name'=>'pageUrl'));
        $input->getValidatorChain()
              ->attach(new Uri());

        $input->getFilterChain()
              ->attach(new UriNormalize());

        $input->setAllowEmpty(true);
        $this->add($input);
    }

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
