<?php
return array(
    'class' => array(
        'HcBackend\Controller\Collection\CommonDataController' => array(
            '__construct' => array(
                'inputData' => array(
                    'type' => 'HcBackend\Data\DataMessagesInterface',
                    'required' => false,
                    'default' => null
                ),
                'serviceCommand' => array(
                    'type' => 'HcBackend\Service\CommandInterface',
                    'required' => true
                ),
                'jsonResponseModelFactory' => array(
                    'type' => 'Zf2Libs\View\Model\Json\Specific\StatusMessageDataModelFactoryInterface',
                    'required' => true
                )
            )
        )
    )
);
