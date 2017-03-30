<?php

include_once("./Services/COPage/classes/class.ilPageComponentPlugin.php");
 
/**
 * 
 * @version $Id$
 *
 */

class ilOFERendererPCPlugin extends ilPageComponentPlugin
{
	function getPluginName()
	{
		return "OFERendererPC";
	}



        function isValidParentType($a_type)
        {
                if (in_array($a_type, array("lm","gdf","qht","qpl","qfbg","qfbs","wpg","impr")))
                {
                        return true;
                }
                return false;
        }


        /**
         * Get Javascript files
         */
        function getJavascriptFiles($a_mode)
        {
                return array("js/ofe.js","js/ASCIIMathML.js");
        }

 	
        /**
         * Get css files
         */
	function getCssFiles($a_mode)
        {
                return array("");
        }

}


?>
