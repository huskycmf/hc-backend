<?php
namespace HcBackend\Options\Module;

use HcBackend\Options\Exception;
use Zend\Validator\Regex;

class Package
{
    /**
     * @var string
     */
    protected $name;

    /**
     * @var string
     */
    protected $httpPath;

    /**
     * @var string
     */
    protected $type;

    /**
     * @var bool
     */
    protected $isJs = false;

    /**
     * @param string $name
     * @param array | string $config
     */
    public function __construct($name, $config)
    {
        $validator = new Regex('/^[a-z\_A-Z]+$/');

        if (!$validator->isValid($name)) {
            throw new Exception\InvalidArgumentException("Package name must contains english letters only [a-zA-Z]");
        }

        $this->name = $name;

        if (!is_array($config)) {
            throw new Exception\InvalidArgumentException("Package config must contain http_path key");
        }

        if (is_array($config['js'])) {
            $this->processJs($config['js']);
        }
    }

    /**
     * @param array $jsConfig
     * @throws \HcBackend\Options\Exception\InvalidArgumentException
     */
    protected function processJs(array $jsConfig)
    {
        $this->isJs = true;

        if (!array_key_exists('http_path', $jsConfig)) {
            throw new Exception\InvalidArgumentException("Js section in Package config must contains http_path parameter");
        }

        if (!array_key_exists('type', $jsConfig)) {
            throw new Exception\InvalidArgumentException("Js section in Package config must contains type parameter");
        }

        if (!in_array($jsConfig['type'], array('content', 'rounded', 'toolbar'))) {
            throw new Exception\InvalidArgumentException("Js section in Package type parameter must be one of the predefined values : [content, rounded, toolbar]");
        }

        $this->httpPath = $jsConfig['http_path'];
        $this->type = $jsConfig['type'];
    }

    /**
     * @return bool
     */
    public function isJs()
    {
        return $this->isJs;
    }

    /**
     * @return string
     */
    public function getHttpPath()
    {
        return $this->httpPath;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }
}
