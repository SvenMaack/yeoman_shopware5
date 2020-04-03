<?php declare(strict_types=1);
/**
 * Created by Yeoman.
 * User: ms
 * Date: <%=date%>
 * Time: <%=time%>
 */

namespace <%=pluginName%>;

use Shopware\Components\Plugin;
use Shopware\Components\Plugin\Context\InstallContext;
use Shopware\Components\Plugin\Context\UpdateContext;
use Shopware\Components\Plugin\Context\UninstallContext;

class <%=pluginName%> extends Plugin
{
    /**
     * {@inheritdoc}
     */
    public function install(InstallContext $context)
    {
    }

    /**
     * {@inheritdoc}
     */
    public function update(UpdateContext $updateContext)
    {
        $this->install($updateContext);
    }

    /**
     * {@inheritdoc}
     */
    public function uninstall(UninstallContext $uninstallContext)
    {
    }
}
