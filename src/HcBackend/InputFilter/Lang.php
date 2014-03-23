<?php
namespace HcBackend\InputFilter;

use Zend\Di\Di;
use Zend\InputFilter\InputFilter;

class Lang extends InputFilter
{
    /**
     * @param Di $di
     */
    public function __construct(Di $di)
    {
        $input = $di->get('Zend\InputFilter\Input', array('name'=>'lang'));
        $input->getValidatorChain()
              ->attach($di->get('Zend\Validator\StringLength', array('options'=>array('min'=>2, 'max'=>2))))
              ->attach($di->get('Zend\Validator\Regex', array('pattern'=>'/^[a-z]{2}$/')));
        $input->setRequired(true);

        $input->getFilterChain()->attach($di->get('Zend\Filter\StringToLower'))
                                ->attach($di->get('Zend\Filter\StringTrim'));

        $this->add($input);
    }
}
