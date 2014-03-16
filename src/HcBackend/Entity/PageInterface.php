<?php
namespace HcBackend\Entity;

interface PageInterface
{
    /**
     * Get id
     *
     * @return integer
     */
    public function getId();

    /**
     * Get keywords
     *
     * @return string
     */
    public function getKeywords();

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription();

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle();

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl();
}
