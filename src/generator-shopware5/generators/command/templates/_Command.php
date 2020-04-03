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
<%_ if (injectModels) { _%>
use Doctrine\ORM\EntityManagerInterface;
<%_ } _%>

/**
 * Created by PhpStorm.
 * User: pmSven
 * Date: 02.03.20
 * Time: 09:28
 */
class <%=commandName%> extends ShopwareCommand
{
	<%_ if (injectModels) { _%>
    /** @var EntityManagerInterface */
    private $entityManager;

    <%_ } _%>
    /**
     * <%=commandName%> constructor.
     *
     <%_ if (injectModels) { _%>
     * @param EntityManagerInterface $entityManager
     <%_ } _%>
     * @param string $name
     */
    public function __construct(<%_ if (injectModels) { _%>EntityManagerInterface $entityManager, <%_ } _%>$name = NULL)
    {
        parent::__construct($name);
    	<%_ if (injectModels) { _%>
        $this->entityManager = $entityManager;
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
