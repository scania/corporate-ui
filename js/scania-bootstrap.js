// This function adds a script element with chosen src, to the page head section
var importScript = function(src, id) {
    var head = document.getElementsByTagName("head")[0],
        script = document.createElement("script");

    script.setAttribute("src", src);
    if(id) {
        script.setAttribute("id", id);
    }
    head.appendChild(script);
}

// Taken from: http://stackoverflow.com/a/979997
var getUrlParameter = function(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

    var regexS = "[\\?&]" + name + "=([^&#]*)",
        regex = new RegExp(regexS),
        results = regex.exec(window.location.href);

    if (results == null) {
        return results;
    } else {
        return results[1];
    }
}

// Taken from: http://stackoverflow.com/a/1181586
var indexOf = function(needle) {
    if(typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                if(this[i] === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }
    return indexOf.call(this, needle);
}

// Cookie related functions taken from: http://stackoverflow.com/a/24103596
var createCookie = function(name, value, days) {
    if (days) {
        var date = new Date();

        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

var readCookie = function(name) {
    var nameEQ = name + "=",
        ca = document.cookie.split(';');

    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

var eraseCookie = function(name) {
    createCookie(name, "", -1);
}

// Handles everything regarding albatross mode
var albatrossMode = function() {
    var parameter = "albatross",
        albatross = getUrlParameter(parameter) || readCookie(parameter);

    if (albatross && albatross == "true") {
        var body        = document.getElementsByTagName("body")[0],
            bodyClass   = body.getAttribute("class"),
            classes     = bodyClass.split(","),
            index       = indexOf.call(classes, parameter);

        if (index < 0) {
            body.setAttribute("class", bodyClass + " " + parameter);
            createCookie(parameter, "true", 30);
        }
    } else if (!albatross || albatross == "false") {
        eraseCookie(parameter);
    }
}

// Lets wait with ready trigger until bootstrap has been loaded
$.holdReady( true );

albatrossMode();

// Adding bootstrap framework
importScript("https://static.scania.com/vendors/frameworks/bootstrap/3.2.0/js/bootstrap.min.js", "bootstrap");

// Adding our bootstrap addons that are not a standalone component
importScript("https://static.scania.com/development/global/js/bootstrap/scania-bootstrap-addons.js");

// Set jquery ready true
$("#bootstrap").on("load", function() {
    $.holdReady( false );
});