<?php
namespace HcBackend\Controller\Collection;

use HcBackend\Controller\AbstractController;
use HcBackend\Factory\DojoRestStorePaginatorFactory;
use HcBackend\Service\FetchPaginatorDataServiceInterface;
use Zend\Mvc\MvcEvent;
use Zf2Libs\Paginator\ViewModel\JsonModel;
use Zf2Libs\Stdlib\Extractor\ExtractorInterface;

class CommonListController extends AbstractController
{
    /**
     * @var FetchPaginatorDataServiceInterface
     */
    protected $paginatorDataFetchService;

    /**
     * @var DojoRestStorePaginatorFactory
     */
    protected $paginatorFactory;

    /**
     * @var ExtractorInterface
     */
    protected $extractor;

    /**
     * @param \HcBackend\Service\FetchPaginatorDataServiceInterface $paginatorDataFetchService
     * @param DojoRestStorePaginatorFactory $paginator
     * @param ExtractorInterface $extractor
     * @internal param \HcBackend\Service\FetchPaginatorDataServiceInterface $fetchQbBuilderService
     */
    public function __construct(FetchPaginatorDataServiceInterface $paginatorDataFetchService,
                                DojoRestStorePaginatorFactory $paginator,
                                ExtractorInterface $extractor)
    {
        $this->paginatorDataFetchService = $paginatorDataFetchService;
        $this->paginatorFactory = $paginator;
        $this->extractor = $extractor;
    }

    /**
     * @param MvcEvent $e
     * @return mixed|void
     */
    public function onDispatch(MvcEvent $e)
    {
        $qb = $this->paginatorDataFetchService
                   ->fetch($this->getRequest()->getQuery());

        $viewModel = new JsonModel($this->extractor);

        $viewModel->setPaginator($this->paginatorFactory
                                      ->getPaginator($qb,
                                                     $this->getRequest(),
                                                     $this->getResponse()));
        $e->setResult($viewModel);
    }
}
