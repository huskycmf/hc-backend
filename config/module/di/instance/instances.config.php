<?php
return array(
    'HcBackend\Controller\User\Login\FormController' => array(
        'parameters' => array(
            'loginModel' => 'HcBackend-View-Model-User-Login'
        )
    ),

    'HcBackend\Controller\User\Login\AuthController' => array(
        'parameters' => array(
            'loginModel' => 'HcBackend-View-Model-User-Login'
        )
    ),

    'HcBackend\Controller\Image\RemoveController' => array(
        'parameters' => array(
            'remover' => 'HcBackend-Images-TotalImagesRemover'
        )
    ),

    'HcBackend-Controller-Images-Create' => array(
        'parameters' => array(
            'saveService' => 'HcBackend-Service-Image-SaveService',
            'uploaderModel' => 'HcBackend-View-Model-UploaderModel',
            'createResourceData' => 'HcBackend-InputFilter-Image-CreateResource'
        )
    ),

    'HcBackend\Service\ImageBinderService' => array(
        'parameters' => array(
            'remover' => 'HcBackend-Images-TotalImagesRemover'
        )
    ),

    'HcBackend-Images-TotalImagesRemover' => array(
        'injections' => array(
            'Zf2FileUploader\Resource\Handler\Remover\FilesystemRemover',
            'Zf2FileUploader\Resource\Handler\Remover\DatabaseRemover'
        )
    ),

    'HcBackend-Images-CleanerStrategy' => array(
        'parameters' => array(
            'remover' => 'HcBackend-Images-TotalImagesRemover'
        )
    ),

    'HcBackend-Service-Image-SaveService' => array(
        'parameters' => array(
            'remover' => 'HcBackend-Images-CleanerStrategy'
        )
    ),

    'HcBackend-Input-Image-CreateResource' => array(
        'parameters' => array(
            'name' => 'upload'
        )
    ),

    'HcBackend-InputFilter-Image-CreateResource' => array(
        'parameters' => array(
            'resourceInput' => 'HcBackend-Input-Image-CreateResource'
        )
    )
);
