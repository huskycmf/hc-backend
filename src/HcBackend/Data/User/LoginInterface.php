<?php
namespace HcBackend\Data\User;

interface LoginInterface
{
    /**
     * @return string
     */
    public function getIdentity();

    /**
     * @return string
     */
    public function getCredential();
}
