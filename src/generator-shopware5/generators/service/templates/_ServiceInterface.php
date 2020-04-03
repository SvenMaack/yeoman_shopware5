<?php declare(strict_types=1);

/**
 * Created by Yeoman.
 * User: ms
 * Date: <%=date%>
 * Time: <%=time%>
 */

namespace <%=pluginName%>\Components<%=subfolderPath%>;

interface <%=serviceName%>Interface
{
    <%_ if (!skipDummy) { _%>
	/**
	 * Foo
	**/
    public function foo(): void;
    <%_ } _%>
}
