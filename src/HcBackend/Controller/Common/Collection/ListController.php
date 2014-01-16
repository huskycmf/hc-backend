<?php
namespace HcBackend\Controller\Common\Collection;

use HcBackend\Service\Fetch\Paginator;
use HcBackend\Controller\AbstractController;
use HcBackend\Factory\DojoRestStorePaginatorFactory;
use Zend\Http\Request;
use Zend\Mvc\MvcEvent;
use Zf2Libs\Paginator\ViewModel\JsonModelInterface;

class ListController extends AbstractController
{
    /**
     * @var Paginator\ArrayCollection\DataServiceInterface | Paginator\QueryBuilder\DataServiceInterface
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

    /**
     * @param Paginator\DataInterface $paginatorDataFetchService
     * @param DojoRestStorePaginatorFactory $paginator
     * @param JsonModelInterface $viewModel
     */
    public function __construct(Paginator\DataInterface $paginatorDataFetchService,
                                DojoRestStorePaginatorFactory $paginator,
                                JsonModelInterface $viewModel)
    {
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
        $data = $this->paginatorDataFetchService->fetch($this->getRequest()->getQuery());

        $this->viewModel->setPaginator($this->paginatorFactory
                                            ->getPaginator($data,
                                                           $this->getRequest(),
                                                           $this->getResponse()));

        $e->setResult($this->viewModel);
    }
}
