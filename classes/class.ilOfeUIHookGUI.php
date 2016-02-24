<?php
 
/* Copyright (c) 1998-2010 ILIAS open source, Extended GPL, see docs/LICENSE */
/* Copyright (c) 2012 by FreeIT.de, Extended GPL, see docs/LICENSE */
 
include_once("./Services/UIComponent/classes/class.ilUIHookPluginGUI.php");
 
/**
 * User interface hook class
 *
 * @author Heiko Bernloehr <Heiko.Bernloehr@FreeIT.de>
 * @version $Id$
 * @ingroup ServicesUIComponent
 */
class ilOfeUIHookGUI extends ilUIHookPluginGUI
{
 
  /**
   * Modify HTML output of GUI elements. Modifications modes are:
   * - ilUIHookPluginGUI::KEEP (No modification)
   * - ilUIHookPluginGUI::REPLACE (Replace default HTML with your HTML)
   * - ilUIHookPluginGUI::APPEND (Append your HTML to the default HTML)
   * - ilUIHookPluginGUI::PREPEND (Prepend your HTML to the default HTML)
   *
   * @param string $a_comp component
   * @param string $a_part string that identifies the part of the UI that is handled
   * @param string $a_par array of parameters (depend on $a_comp and $a_part)
   *
   * @return array array with entries "mode" => modification mode, "html" => your html
   */
  function getHTML($a_comp, $a_part, $a_par = array())
  {
    global $tpl;
    $pl = new ilOfePlugin();
    $pl->includeClass("class.ilOfeHelper.php");
    global $rbacreview;
    if ($a_comp == "Services/MainMenu" && $a_part == "main_menu_list_entries" && ilOfeHelper::hasCurrentUserOfeRole())
    {
      $tpl->addJavaScript($pl->getDirectory()."/js/ofe.js");
      $tpl->addJavaScript($pl->getDirectory()."/js/ASCIIMathML.js");
      $local_tpl = $pl->getTemplate("tpl.main_menu_list_entries.html");
      $local_tpl->setCurrentBlock("ofe");
      $local_tpl->setVariable("PLUGIN_DIRECTORY", $pl->getDirectory());
      $local_tpl->setVariable("TXT_OFE", "OFE");
      $local_tpl->setVariable("SCRIPT_OFE", "javascript:Ofe.start('http://ecs.uni-stuttgart.de:7924/ofe');");
      $local_tpl->setVariable("MM_CLASS", "MMInactive");
      $local_tpl->parseCurrentBlock();
      $output = $local_tpl->get();
      return array("mode" => ilUIHookPluginGUI::APPEND, "html" => $output);
    }
  }
}
?>
