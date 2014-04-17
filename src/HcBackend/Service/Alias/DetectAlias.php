<?php
namespace HcBackend\Service\Alias;

use HcBackend\Entity\AliasWiredAwareInterface;

class DetectAlias
{
    /**
     * @param AliasWiredAwareInterface $aliasWired
     * @return \HcBackend\Entity\AliasWiredInterface | null
     */
    public function detect(AliasWiredAwareInterface $aliasWired)
    {
        $aliasPrimaryEntity = null;
        foreach($aliasWired->getAlias() as $aliasPrimaryEntity) {
            if ($aliasPrimaryEntity->getIsPrimary() == true) {
                return $aliasPrimaryEntity;
            }
        }

        return $aliasPrimaryEntity;
    }
}
