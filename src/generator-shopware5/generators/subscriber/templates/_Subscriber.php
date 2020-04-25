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
use Enlight_Controller_Action;
<% for (let i=0; i<injections.length; i++) { %>use <%=injections[i].path%>;
<%_ } _%>

class <%=type%> implements SubscriberInterface
{
<% for (let i=0; i<injections.length; i++) { %>    /** @var <%=injections[i].name%> */
    private $<%=injections[i].varName%>;

<%_ } _%>
    /**
     * <%=type%> Subscriber constructor.
     *
<% for (let i=0; i<injections.length; i++) { %>     * @param <%=injections[i].name%> $<%=injections[i].varName%>
<%_ } _%>
     */
    public function __construct(
<% for (let i=0; i<injections.length; i++) { %>        <%=injections[i].name%> $<%=injections[i].varName%><%_ if (i < (injections.length - 1)) { _%>,<%_ } _%>

<%_ } _%>
    )
    {
<% for (let i=0; i<injections.length; i++) { %>        $this-><%=injections[i].varName%> = $<%=injections[i].varName%>;
<%_ } _%>
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
        /** @var Enlight_Controller_Action $subject */
        $subject = $args->getSubject();

        $view = $subject->View();

        $id = $subject->Request()->getParams()['id'];

    	return [];
    }
}
