<?php
namespace HcBackend\Controller\Common\Collection;

use Doctrine\ORM\QueryBuilder;
use HcBackend\Service\Fetch\Paginator;
use HcBackend\Service\FetchServiceInterface;
use Zend\Http\PhpEnvironment\Request;
use Zend\Mvc\MvcEvent;
use Zf2Libs\Paginator\ViewModel\JsonModelInterface;
use HcBackend\Factory\DojoRestStorePaginatorFactory;

class ResourceListController extends AbstractResourceController
{
    /**
     * @var Paginator\ArrayCollection\ResourceDataServiceInterface | Paginator\QueryBuilder\ResourceDataServiceInterface
     */
    protected $paginatorDataFetchService;

    /**
     * @var DojoRestStorePaginatorFactory
     */
    protected $paginatorFactory;

    /**
     * @var JsonModelInterface
     */
    protected $viewModel;

    public function __construct(FetchServiceInterface $fetchService,
                                Paginator\ResourceDataInterface $paginatorDataFetchService,
                                DojoRestStorePaginatorFactory $paginator,
                                JsonModelInterface $viewModel)
    {
        parent::__construct($fetchService);

        $this->paginatorDataFetchService = $paginatorDataFetchService;
        $this->paginatorFactory = $paginator;
        $this->viewModel = $viewModel;
    }

    /**
     * @param MvcEvent $e
     * @return mixed|void
     */
    public function onDispatch(MvcEvent $e)
    {
        $data = $this->paginatorDataFetchService->fetch($this->resourceEntity,
                                                        $this->getRequest()->getQuery());

        $this->viewModel->setPaginator($this->paginatorFactory
                                            ->getPaginator($data,
                                                           $this->getRequest(),
                                                           $this->getResponse()));

        $e->setResult($this->viewModel);
    }
}
