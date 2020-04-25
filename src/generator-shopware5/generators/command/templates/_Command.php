<?php declare(strict_types=1);

/**
 * Created by Yeoman.
 * User: ms
 * Date: <%=date%>
 * Time: <%=time%>
 */

namespace <%=pluginName%>\Commands;

use Shopware\Commands\ShopwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
<% for (let i=0; i<injections.length; i++) { %>use <%=injections[i].path%>;
<%_ } _%>

class <%=commandName%> extends ShopwareCommand
{
<% for (let i=0; i<injections.length; i++) { %>    /** @var <%=injections[i].name%> */
    private $<%=injections[i].varName%>;

<%_ } _%>
    /**
     * <%=commandName%> constructor.
     *
     * @param string $name
<% for (let i=0; i<injections.length; i++) { %>     * @param <%=injections[i].name%> $<%=injections[i].varName%>
<%_ } _%>
     */
    public function __construct(
<% for (let i=0; i<injections.length; i++) { %>        <%=injections[i].name%> $<%=injections[i].varName%>,
<%_ } _%>
        $name = NULL
    )
    {
        parent::__construct($name);
<% for (let i=0; i<injections.length; i++) { %>        $this-><%=injections[i].varName%> = $<%=injections[i].varName%>;
<%_ } _%>
    }

    /**
     * {@inheritdoc}
     */
    protected function configure(): void
    {
        $this
            ->setName('<%=commandCallString%>')
            ->setDescription('<%=commandDescription%>')
            ->setHelp('<%=commandHelp%>');
    }

    /**
     * {@inheritDoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output): void
    {
        $output->writeln('Done');
    }
}
