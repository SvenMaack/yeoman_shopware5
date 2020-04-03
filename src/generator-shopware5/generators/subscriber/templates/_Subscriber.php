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
    	return [];
    }
}
