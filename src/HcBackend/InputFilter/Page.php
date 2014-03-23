<?php
namespace HcBackend\InputFilter;

use Zend\InputFilter\InputFilter;

class Page extends InputFilter
{
    public function __construct()
    {
        $this->add(array(
            'name' => 'pageDescription',
            'allow_empty' => true,
            'validators' => array(
                array(
                    'name' => 'string_length',
                    'options' => array(
                        'max' => 300
                    )
                )
            )
        ));

        $this->add(array(
            'name' => 'pageKeywords',
            'allow_empty' => true,
            'validators' => array(
                array(
                    'name' => 'string_length',
                    'options' => array(
                        'max' => 300
                    )
                )
            )
        ));

        $this->add(array(
            'name' => 'pageTitle',
            'allow_empty' => true,
            'validators' => array(
                array(
                    'name' => 'string_length',
                    'options' => array(
                        'max' => 300
                    )
                )
            )
        ));

        $this->add(array(
            'name' => 'pageUrl',
            'allow_empty' => true,
            'validators' => array(
                array('name' => 'uri')
            ),
            'filters' => array(
                array('name' => 'uri_normalize')
            )
        ));
    }
}
