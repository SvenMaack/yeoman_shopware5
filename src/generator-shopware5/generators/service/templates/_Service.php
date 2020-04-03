<?php declare(strict_types=1);

/**
 * Created by Yeoman.
 * User: ms
 * Date: <%=date%>
 * Time: <%=time%>
 */

namespace <%=pluginName%>\Components;

<%_ if (injectModels) { _%>
use Doctrine\ORM\EntityManagerInterface;

<%_ } _%>
class <%=serviceName%> implements <%=serviceName%>Interface
{
	<%_ if (injectModels) { _%>
    /** @var EntityManagerInterface */
    private $entityManager;

    <%_ } _%>
    /**
     * <%=serviceName%> constructor.
     <%_ if (injectModels) { _%>
     *
     * @param EntityManagerInterface $entityManager
     <%_ } _%>
     */
    public function __construct(<%_ if (injectModels) { _%>EntityManagerInterface $entityManager<%_ } _%>)
    {
    	<%_ if (injectModels) { _%>
        $this->entityManager = $entityManager;
        <%_ } _%>
    }
}
