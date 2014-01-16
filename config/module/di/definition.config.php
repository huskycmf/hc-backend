<?php
return array(
    'class' => array(
        'HcBackend\Controller\Common\Collection\DataController' => array(
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
        ),
        'HcBackend\Service\FetchService' => array(
            '__construct' => array(
                'entityManager' => array(
                    'type' => 'Doctrine\ORM\EntityManagerInterface',
                    'required' => true
                ),
                'entityName' => array(
                    'type' => false,
                    'required' => true
                )
            )
        )
    )
);
