<?php
return array(
    'ZfcUser-LoginForm' => 'ZfcUser\Form\Login',
    'HcBackend-Images-TotalImagesRemover' => 'Zf2FileUploader\Resource\Handler\Remover\AggregateRemover',
    'HcBackend-Images-CleanerStrategy' => 'Zf2FileUploader\Service\Cleaner\ImageTemporaryCleaner',
    'HcBackend-Service-Image-SaveService' => 'Zf2FileUploader\Service\Image\SaveService',
    'HcBackend-View-Model-UploaderModel' => 'Zf2FileUploader\View\Model\UploaderModel',
    'HcBackend-InputFilter-Image-CreateResource' => 'Zf2FileUploader\InputFilter\Image\CreateResource',
    'HcBackend-Input-Image-CreateResource' => 'Zf2FileUploader\Input\Image\CreateResource',

    // Controllers
    'HcBackend-Controller-Images-Create' => 'Zf2FileUploader\Controller\Images\CreateController',

    //ViewModels
    'HcBackend-View-Model-User-Login' => 'HcBackend\View\Model\User\LoginModel'

);
