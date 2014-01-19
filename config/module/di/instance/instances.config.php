<?php
return array(
    'HcBackend\Controller\User\Login\FormController' => array(
        'parameters' => array(
            'loginModel' => 'HcBackend\View\Model\User\LoginModel'
        )
    ),

    'HcBackend\Controller\User\Login\AuthController' => array(
        'parameters' => array(
            'loginModel' => 'HcBackend\View\Model\User\LoginModel'
        )
    ),

    'HcBackend\Service\ImageBinderService' => array(
        'parameters' => array(
            'remover' => 'HcBackend-Images-Default-TotalImagesRemover'
        )
    ),

    'HcBackend-Images-Default-TotalImagesRemover' => array(
        'injections' => array(
            'Zf2FileUploader\Resource\Handler\Remover\FilesystemRemover',
            'Zf2FileUploader\Resource\Handler\Remover\DatabaseRemover'
        )
    ),

    'HcBackend-Images-Default-CleanerStrategy' => array(
        'parameters' => array(
            'remover' => 'HcBackend-Images-Default-TotalImagesRemover'
        )
    ),

    'HcBackend-Images-Default-SaveService' => array(
        'parameters' => array(
            'remover' => 'HcBackend-Images-Default-CleanerStrategy'
        )
    )
);
