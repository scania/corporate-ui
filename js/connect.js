
// Rebuilding the CONNECT toolbar

function rebuildMainHeader(){

    $("#topnav").append("<span class='scania-portal-logo'></span><span class='application-name'></span>")
    $(".connect-header").addClass("fade-in");
	$(".connect-hb-menu").append("<span class='apps-icon'><i class='icon-th'></i></span>")
    $(".connect-menu-label").html("Apps");
    $(".connect-hb-icon").removeClass("connect-hb-icon");
    $(".connect-hb-button").removeClass("connect-hb-button");  
    $(".connect-sidebar-toggle ").removeClass("connect-sidebar-toggle");      
    $(".connect-hb-icon").toggleClass("app-menu");
    $("#connect-search-field").attr("placeholder", "Global Intranet Search...").val("").focus().blur();
	$(".connect-dropdown.connect-active").removeClass("connect-active");

}
    setTimeout(rebuildMainHeader, 1900);

// Ready rebuilding

