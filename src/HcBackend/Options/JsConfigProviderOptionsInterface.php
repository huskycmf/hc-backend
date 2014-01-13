<?php
namespace HcBackend\Options;

use HcBackend\Stdlib\Provider\JsConfigInterface;

interface JsConfigProviderOptionsInterface
{
    /**
     * @return JsConfigInterface[]
     */
    public function getJsConfigProviders();
}
