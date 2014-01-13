<?php
namespace HcBackend\Stdlib\Provider;

interface JsHuskyConfigInterface extends JsConfigInterface
{
    /**
     * @return array
     */
    public function getHuskyConfig();
}
