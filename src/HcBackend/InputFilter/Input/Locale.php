<?php
namespace HcBackend\InputFilter\Input;

use Zend\InputFilter\Input;

class Locale extends Input
{
    public function __construct($name)
    {
        parent::__construct($name);

        $this->getValidatorChain()->attachByName('string_length', array('max' => 2, 'min' => 2));
        $this->getValidatorChain()->attachByName('regex', array('pattern' => '/^[a-z]{2}$/'));

        $this->getFilterChain()->attachByName('string_to_lower');
        $this->getFilterChain()->attachByName('string_trim');
    }
}
