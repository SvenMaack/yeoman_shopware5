<?php declare(strict_types=1);

/**
 * Created by Yeoman.
 * User: ms
 * Date: <%=date%>
 * Time: <%=time%>
 */

namespace <%=pluginName%>\Subscriber;

use Enlight\Event\SubscriberInterface;
use Enlight_Event_EventArgs;

class <%=type%> implements SubscriberInterface
{
    /**
     * <%=type%> Subscriber constructor.
     */
    public function __construct()
    {
    }

    /**
     * {@inheritDoc}
     */
    public static function getSubscribedEvents(): array
    {
        return [
            /*
            'Enlight_Controller_Action_PostDispatchSecure_Backend_Article' => 'postExtendBackendArticle',
            'Enlight_Controller_Action_PreDispatch_Backend_Article' => 'preExtendBackendArticle',
            'Enlight_Controller_Action_PostDispatchSecure_Frontend_Detail' => 'onFrontendDetailPostDispatch',
            'Shopware_Controllers_Backend_Article::saveArticle::after' => 'afterArticleBackendSave',
            'Shopware_Controllers_Frontend_Listing::indexAction::replace' => 'onReplaceListing',
            'Shopware_Controllers_Frontend_Listing::indexAction::before' => 'onBeforeListing',
            'Shopware_Modules_Order_SaveOrder_ProcessDetails' => 'onSaveOrder',
            'Shopware_CronJob_Foo' => 'onFooCronjob',
            */
        ];
    }

    /**
     *
     * @param Enlight_Event_EventArgs $args
     *
     * @return array
     */
    public function onFoo(Enlight_Event_EventArgs $args): array
    {
        /** @var \Enlight_Controller_Action $subject */
        $subject = $args->getSubject();

        $view = $subject->View();

        $id = $subject->Request()->getParams()['id'];

    	return [];
    }
}
