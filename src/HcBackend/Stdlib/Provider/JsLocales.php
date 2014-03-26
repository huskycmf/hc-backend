<?php
namespace HcBackend\Stdlib\Provider;

use Doctrine\ORM\EntityManagerInterface;
use HcBackend\Options\Module\Package;
use HcBackend\Stdlib\Provider\JsHuskyConfigInterface;

class JsLocales implements JsHuskyConfigInterface
{
    /**
     * @var Package[]
     */
    protected $packages;

    /**
     * @var array
     */
    protected $huskyConfig = array();

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->huskyConfig = array('languages'=>array());

        $localeRepository = $entityManager->getRepository('HcCore\Entity\Locale');
        /* @var $localeEntity \HcCore\Entity\Locale */
        foreach($localeRepository->findAll() as $localeEntity) {
            $this->huskyConfig['languages'][] = array('locale'=>$localeEntity->getLocale(),
                      'title'=>$localeEntity->getTitle(),
                      'priority'=>$localeEntity->getPriority(),
                      'default'=>$localeEntity->getIsDefault());
        }

    }

    /**
     * @return array
     */
    public function getHuskyConfig()
    {
        return $this->huskyConfig;
    }
}

