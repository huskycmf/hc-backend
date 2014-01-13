<?php
namespace HcBackend\Stdlib\Provider;

interface JsDojoConfigInterface extends JsConfigInterface
{
    /**
     * @return array
     */
    public function getDojoConfig();
}
