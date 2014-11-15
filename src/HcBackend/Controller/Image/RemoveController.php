<?php
namespace HcBackend\Controller\Image;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Zend\Mvc\MvcEvent;
use Zf2FileUploader\Controller\AbstractRemoveController;
use Zf2FileUploader\Resource\Handler\Remover\RemoverInterface;
use Zf2FileUploader\View\Model\RemoveModel;

class RemoveController extends AbstractRemoveController
{
    /**
     * @var RemoverInterface
     */
    protected $remover;

    /**
     * @var EntityRepository
     */
    protected $repository;

    /**
     * @param EntityManagerInterface $entityManager
     * @param RemoverInterface $remover
     */
    public function __construct(EntityManagerInterface $entityManager,
                                RemoverInterface $remover)
    {
        $this->remover = $remover;
        $this->repository = $entityManager->getRepository('HcBackend\Entity\Image');
    }

    /**
     * @return EntityRepository
     */
    protected function getRepository()
    {
        return $this->repository;
    }

    /**
     * @param MvcEvent $e
     * @return mixed | void
     */
    public function onDispatch(MvcEvent $e)
    {
        $removeModel = new RemoveModel();

        if (!$this->remover->remove($this->getResource())) {
            $removeModel->fail();
        } else {
            $removeModel->success();
        }

        $e->setResult($removeModel);
    }
}
