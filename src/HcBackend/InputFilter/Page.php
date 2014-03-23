<?php
namespace HcBackend\InputFilter;

use Zend\Di\Di;
use Zend\InputFilter\InputFilter;

abstract class Page extends InputFilter
{
    public function __construct(Di $di)
    {
        $input = $di->get('Zend\InputFilter\Input', array('name'=>'pageDescription'));
        $input->getValidatorChain()
              ->attach($di->get('Zend\Validator\StringLength', array(array('max'=>'300'))));
        $input->setAllowEmpty(true);
        $this->add($input);

        $input = $di->get('Zend\InputFilter\Input', array('name'=>'pageKeywords'));
        $input->getValidatorChain()
              ->attach($di->get('Zend\Validator\StringLength', array(array('max'=>'300'))));
        $input->setAllowEmpty(true);
        $this->add($input);

        $input = $di->get('Zend\InputFilter\Input', array('name'=>'pageTitle'));
        $input->getValidatorChain()
              ->attach($di->get('Zend\Validator\StringLength', array(array('max'=>'300'))));
        $input->setAllowEmpty(true);
        $this->add($input);

        $input = $di->get('Zend\InputFilter\Input', array('name'=>'pageUrl'));
        $input->getValidatorChain()
              ->attach($di->get('Zend\Validator\Uri'));
        $input->getFilterChain()
              ->attach($di->get('Zend\Filter\UriNormalize'));
        $input->setAllowEmpty(true);
        $this->add($input);
    }
}
