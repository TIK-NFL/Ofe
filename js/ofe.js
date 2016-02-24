Ofe = { 
  Browser: {
    IE:     !!(window.attachEvent && !window.opera),
    Opera:  !!window.opera,
    WebKit: document.childNodes && !document.all && !navigator.taintEnabled,
    Gecko:  navigator.userAgent.match("(Gecko)")[1] == "Gecko",
    MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/),
  },
  Matheval: {},
  Helper: {
    DOM: {}
  }
};

Ofe.Browser.IE6 =       Ofe.Browser.IE && (typeof window.XMLHttpRequest == "undefined")
Ofe.Browser.IE7 =       Ofe.Browser.IE && (typeof window.XMLHttpRequest == "object")


Ofe.Browser.switch = function(p1,p2) {
return p2;
};

Ofe.start = function(url) {
    var width=680;
    var height=710;
    var location_x = (screen.width - width) / 2;
    var location_y = (screen.height - height) / 2;
    
    /* make sure, the path is correct... test it */
	window.open(url, "_blank", "height=" + height + ",width=" + width + ",left=" + location_x + ",top=" + location_y + ",location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=1");
};


Ofe.setText = function() {
    /* Alle Kind-Knoten vom ofe_output_area löschen */
    var ofe_output_area = document.getElementById("ofe_output_area");
    while (ofe_output_area.firstChild != null) {
        ofe_output_area.removeChild(ofe_output_area.firstChild);
    }

    var ta_value = document.getElementById("ofe_input_text_form").value;
    /* Tags [ofe][/ofe] entfernen */
    ta_value = ta_value.replace(/\[ofe\]/g, "");
    ta_value = ta_value.replace(/\[\/ofe\]/g, "");
    /* Tags [ofe][/ofe] hinzufügen */
    ta_value = "[ofe]" + ta_value + "[/ofe]";

    /* Neuer Text */
    var textnode = document.createTextNode(ta_value);
    
    ofe_output_area.appendChild(textnode);
    
    AMprocessNodeR(textnode, true)
};

Ofe.insertText = function(s) {
    /*
     * Quellen:
     * http://de.selfhtml.org/javascript/objekte/htmlelemente.htm#textarea
     * http://aktuell.de.selfhtml.org/artikel/javascript/bbcode/
     */

    var ta = document.getElementById("ofe_input_text_form");

    ta.focus();

    if (Ofe.Browser.Gecko) {
      var end = ta.selectionEnd;
      ta.value = ta.value.substr(0, end) + s + ta.value.substr(end);
      ta.selectionStart = end + s.length;
      ta.selectionEnd = end + s.length;
    }
    else if (Ofe.Browser.IE) {
        var range = document.selection.createRange();
        var insText = range.text;
        range.text = insText + s;
    }
    /* sonstige Browser: am Ende einfügen */
    else {
        ta.value = ta.value + s;
    }
    
    /* Tags [ofe][/ofe] entfernen */
    ta.value = ta.value.replace(/\[ofe\]/g, "");
    ta.value = ta.value.replace(/\[\/ofe\]/g, "");
    
    
    /* Tags [ofe][/ofe] hinzufügen */
    //ta.value = "[ofe]" + ta.value + "[/ofe]";
    
    
    /* Rendern */
    Ofe.setText();
};

Ofe.selectAll = function() {
    var ta = document.getElementById("ofe_input_text_form");
    ta.select();
};

Ofe.clearAll = function() {
		var ta = document.getElementById("ofe_input_text_form");

    /* Alle Kind-Knoten vom ofe_output_area löschen */
    var ofe_output_area = document.getElementById("ofe_output_area");
    while (ofe_output_area.firstChild != null) {
        ofe_output_area.removeChild(ofe_output_area.firstChild);
    }

		ta.value = "";
};

Ofe.clearTextValue = function(id) {
    document.getElementById(id).value="";
}


// from http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
Ofe.getWindowSize = function() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 3 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
	return [myWidth,myHeight];
};


Ofe.getWindowSizeWidth = function() {
	return window.outerWidth ;
//	return ofeGetWindowSize()[0]
//return window.innerWidth != null? window.innerWidth : document.documentElement && document.documentElement.clientWidth ?       document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
};

Ofe.getWindowSizeHeight = function() {
	return window.outerHeight ;
//	return ofeGetWindowSize()[1]
//return  window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ?  document.documentElement.clientHeight : document.body != null? document.body.clientHeight : null;
};

Ofe.setWindowSize = function(width,height) {
	window.resizeTo(width,height);
};

Ofe.Helper.DOM = {
  getContainer : function(node, tagName, className) {
    // Starting with the given node, find the nearest containing element
    // with the specified tag name and style class.
    while (node != null) {
      if (node.tagName != null && node.tagName == tagName &&
          Ofe.Helper.DOM.hasClassName(node, className))
        return node;
      node = node.parentNode;
    }
    return node;
  },
  hasClassName: function(el, name) {
    var i, list;
    // Return true if the given element currently has the given class
    // name or is undefined.
    if (name == undefined) return true;
    list = el.className.split(" ");
    for (i = 0; i < list.length; i++)
      if (list[i] == name)
        return true;
    return false;
  }
};


Ofe.Matheval = {
  id : 1, /* Nummerierung der ofe Formeln beginnend mit 1 */
  plugin_directory: "",
  attribs : [],
  init : function(node,str) {
    node.setAttribute("id","ofeMathId"+Ofe.Matheval.id++);  
    var span = document.createElement('span');
    span.setAttribute("class","AM");
    var img  = document.createElement('img');
    img.src  = Ofe.Matheval.plugin_directory + "/images/ofe_gumdrop.png";
    img.style.display = "none";
    img.style.position = "absolute";
    span.appendChild(node);
    span.appendChild(img);
    if (Ofe.Matheval.isEval()) {
      node.setAttribute("eval","true");
      span.addEventListener('dblclick',function (e) {
        Ofe.start('http://ecs.uni-stuttgart.de:7924/ofe?math='+encodeURIComponent(str.replace(/\s+/g," ")));
        },true);
      if (navigator.userAgent.match("Firefox/([389]|[123456789][0123456789])\.")) {
        span.addEventListener('mousemove',function(e) {
          //container=Ofe.Helper.DOM.getContainer(e.target,"SPAN","AM");
          var x = e.clientX + window.scrollX;
          var y = e.clientY + window.scrollY;
          x += 9; y -= 15;
          img.style.left = x + "px";
          img.style.top  = y + "px";
          img.style.display = "";
          //this.style.backgroundColor = "gainsboro";
          },true);
        span.addEventListener('mouseout',function(e) {
          //container=Ofe.Helper.DOM.getContainer(e.target,"SPAN","AM");
          img.style.display = "none";
          //this.style.backgroundColor = "white";
          },false);
      }
    }
    return span;
  },
  isEval : function() {
    if (Ofe.Matheval.attribs && Ofe.Matheval.attribs[0]=="eval" &&  Ofe.Matheval.attribs[1]=="true") {
      return true;
    }  else { return false; }
  },
  saveAttribs : function(st) {
    var arr = st.match(RegExp('\\[(?:ofe|ltx) +([^ =]+) *= *"([^ "\\]]+).*'));
    if (arr) {
      delete arr[0]; // full match result don't interest
      var k=0;
      for (var i=0;i<arr.length;i++) {
        if (arr[i]) Ofe.Matheval.attribs[k++]=arr[i];
      }
    } else Ofe.Matheval.attribs=[];
  }
};


	
function pageWidth() {return window.innerWidth != null? window.innerWidth : document.documentElement && document.documentElement.clientWidth ?       document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;} function pageHeight() {return  window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ?  document.documentElement.clientHeight : document.body != null? document.body.clientHeight : null;} function posLeft() {return typeof window.pageXOffset != 'undefined' ? window.pageXOffset :document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0;} function posTop() {return typeof window.pageYOffset != 'undefined' ?  window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;} function posRight() {return posLeft()+pageWidth();} function posBottom() {return posTop()+pageHeight();}

