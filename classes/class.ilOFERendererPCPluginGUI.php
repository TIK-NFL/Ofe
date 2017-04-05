<?php

include_once("./Services/COPage/classes/class.ilPageComponentPluginGUI.php");

/**
 * @version $Id$
 * @ingroup ServicesUIComponent
 */

class ilOFERendererPCPluginGUI extends ilPageComponentPluginGUI
{

	/**
	 * @param string $a_comp component
	 * @param string $a_part string that identifies the part of the UI that is handled
	 * @param string $a_par array of parameters (depend on $a_comp and $a_part)
	 *
	 * @return array array with entries "mode" => modification mode, "html" => your html
	 */

	function executeCommand()
	{}

	function insert()
	{}

	function edit()
	{}

	function create()
	{}

	function getElementHTML($a_mode, array $a_properties, $plugin_version)
	{}
}
?>
