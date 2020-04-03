<?php declare(strict_types=1);

/**
 * Created by Yeoman.
 * User: ms
 * Date: <%=date%>
 * Time: <%=time%>
 */

namespace <%=pluginName%>\Components<%=subfolderPath%>;

<%_ if (injectModels) { _%>
use Doctrine\ORM\EntityManagerInterface;
<%_ } _%>
<%_ if (injectSnippets) { _%>
use Shopware_Components_Snippet_Manager as SnippetManager;
<%_ } _%>

class <%=serviceName%> implements <%=serviceName%>Interface
{
	<%_ if (injectModels) { _%>
    /** @var EntityManagerInterface */
    private $entityManager;

    <%_ } _%>
    <%_ if (injectSnippets) { _%>
    /** @var SnippetManager */
    private $snippetManager;

    <%_ } _%>
    /**
     * <%=serviceName%> constructor.
     *
     <%_ if (injectModels) { _%>
     * @param EntityManagerInterface $entityManager
     <%_ } _%>
     <%_ if (injectSnippets) { _%>
     * @param SnippetManager $snippetManager
     <%_ } _%>
     */
    public function __construct(<%_ if (injectModels) { _%>EntityManagerInterface $entityManager<%_ } _%><%_ if (injectModels && injectSnippets) { _%>, <%_ } _%><%_ if (injectSnippets) { _%>SnippetManager $snippetManager<%_ } _%>)
    {
    	<%_ if (injectModels) { _%>
        $this->entityManager = $entityManager;
        <%_ } _%>
        <%_ if (injectSnippets) { _%>
        $this->snippetManager = $snippetManager;
        <%_ } _%>
    }
    <%_ if (!skipDummy) { _%>

    /**
     * {@inheritDoc}
     */
    public function foo(): void
    {
        <%_ if (injectSnippets) { _%>
        /*
        $msg = $this->snippetManager
            ->getNamespace('foo_namespace')
            ->get('foo_name', 'default', true);
        */
        <%_ } _%>
        <%_ if (injectModels) { _%>
        //$detailRepo = $this->entityManager->getRepository(Detail::class);
        <%_ } _%>
    }
    <%_ } _%>
}
