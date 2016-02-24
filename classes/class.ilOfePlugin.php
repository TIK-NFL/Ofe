<?php
 
include_once("./Services/UIComponent/classes/class.ilUserInterfaceHookPlugin.php");
 
/**
 * Ofe (online math formular editor)
 *
 * @author Heiko Bernloehr <Heiko.Bernloehr@FreeIT.de>
 * @version $Id$
 *
 */
class ilOfePlugin extends ilUserInterfaceHookPlugin
{
        function getPluginName()
        {
                return "Ofe";
        }
}
 
?>
