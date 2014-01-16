<?php
namespace HcBackend\Controller\Exception;

use HcBackend\Exception\ExceptionInterface;

class UnexpectedValueException extends \UnexpectedValueException implements ExceptionInterface {}
