
// Rebuilding the CONNECT toolbar

$(".portal-main-container").prepend("<div class='application-info'><span class='scania-header-symbol'></span><span class='application-name'></span></div>")

$("body").append("<button class='btn btn-sm btn-default hidden' type='button' id='restore-button'><span class='small-menu'><i class='icon-reorder'></i><span class='menu-text'>MAIN MENU</span></span></button>")

function rebuildMainHeader(){

	$(".connect-hb-menu").append("<span class='apps-icon'><i class='icon-th'></i></span>")
    $(".connect-header").addClass("fade-in");
    $(".connect-menu-label").html("Apps");
    $(".connect-hb-icon").removeClass("connect-hb-icon");
    $(".connect-hb-button").removeClass("connect-hb-button");  
    $(".connect-sidebar-toggle ").removeClass("connect-sidebar-toggle");      
    $(".connect-hb-icon").toggleClass("app-menu");
    $("#connect-search-field").attr("placeholder", "Global Intranet Search...").val("").focus().blur();
	$(".connect-dropdown.connect-active").removeClass("connect-active");

}
    setTimeout(rebuildMainHeader, 2800);

// Ready rebuilding

// Emphasizing the main menu restor button


function mainMenuSlideOut(){
   $( "#restore-button" ).addClass( "slide-out-right" );
}
    setTimeout(mainMenuSlideOut, 700);



    function bindCtrlM(){
        $(document).bind('keydown','m',function (evt){
          $("body").toggleClass("maximized");
                $("#restore-button").removeClass("hidden");

                chartResize();

                $("body").hasClass("maximized") ? setMaximizeCookie("scaniaBootstrap_maximize", "maximized", 90000) : setMaximizeCookie("scaniaBootstrap_maximize", "minimized", 90000);
            return false;
        });
    }
    

    setTimeout(bindCtrlM, 800);
// End emphasizing 