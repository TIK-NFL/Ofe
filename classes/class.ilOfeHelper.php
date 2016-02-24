<?php
/*
        +-----------------------------------------------------------------------------+
        | FreeIT.de                 Technologie-Beratung · Systemsoftware · Schulung  |
        | ILIAS open source                                                           |
        +-----------------------------------------------------------------------------+
        | Copyright (c) 2007 FreeIT.de (open source)                                  |
        |                                                                             |
        | This program is free software; you can redistribute it and/or               |
        | modify it under the terms of the GNU General Public License                 |
        | as published by the Free Software Foundation; version 3 of the License,     |
        | or (at your option) any later version.                                      |
        |                                                                             |
        | This program is distributed in the hope that it will be useful,             |
        | but WITHOUT ANY WARRANTY; without even the implied warranty of              |
        | MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the               |
        | GNU General Public License for more details.                                |
        |                                                                             |
        | You should have received a copy of the GNU General Public License           |
        | along with this program; if not, write to the Free Software                 |
        | Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA. |
        +-----------------------------------------------------------------------------+
*/
class ilOfeHelper
{
        public static function hasCurrentUserOfeRole()
        {
                if (!isset($_SESSION['ofe_user']))
                {
                  $_SESSION['ofe_user'] = ilOfeHelper::isRoleMember($_SESSION["AccountId"], 'OFE');
                }
                return $_SESSION['ofe_user'];
        }

        public static function isRoleMember($account_id, $ofe_role)
        { 
                global $rbacreview;
                include_once "./Services/Search/classes/class.ilSearch.php";
     
                $ofesearch =& new ilSearch($_SESSION["AccountId"]);
                $ofesearch->setSearchString($ofe_role);
                $ofesearch->setSearchFor(array("role"));
                $ofesearch->validate($ofemessage);
                $ofesearch->setPerformUpdate(false); // must be set to false because of DB error => Bug
                $ofesearch->performSearch();

                $ofesearch_result = $ofesearch->getResultByType("role");
                if (count($ofesearch_result) >= 1) {
                        $ofe_id = $ofesearch_result[0]["id"];
                        return $rbacreview->isAssigned($account_id, $ofe_id);
                } else {
                        return FALSE;
                }
        }
}

