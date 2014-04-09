<?php
namespace HcBackend\InputFilter\Input;

use Zend\InputFilter\Input;

class Locale extends Input
{
    public function __construct($name)
    {
        parent::__construct($name);

        $this->getValidatorChain()->attachByName('string_length', array('max' => 5, 'min' => 5));
        $this->getValidatorChain()->attachByName('regex', array('pattern' => '/^[a-z]{2}-[A-Z]{2}$/'));

        $this->getFilterChain()->attachByName('string_trim');
    }
}
