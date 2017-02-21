/*!
 * Javascript NOE Add Ons to Scania Bootstrap
 */


// Rebuilding the CONNECT toolbar

$("body").append("<button class='btn btn-sm btn-default hidden' type='button' id='restore-button'><span class='small-menu'><i class='icon-reorder'></i><span class='menu-text'>MAIN MENU</span></span></button>")


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



function init() {
    var cookie_scaniaBootstrap_maximize = getMaximizeCookie("scaniaBootstrap_maximize");

    $("body").append("<button class='btn btn-sm btn-default hidden' type='button' id='restore-button'><span class='small-menu'><i class='icon-reorder'></i><span class='menu-text'>MAIN MENU</span></span></button>")

    if(cookie_scaniaBootstrap_maximize === "maximized"){
        $("body").addClass("maximized");
        $("#restore-button").removeClass("hidden");
        chartResize();
    }




    var stickyNavTop = $('.main-navigation').offset().top;
      
      // our function that decides weather the navigation bar should have "fixed" css position or not.
      var stickyNav = function(){
        var scrollTop = $(window).scrollTop(); // our current vertical position from the top
             
        // if we've scrolled more than the navigation, change its position to fixed to stick to top,
        // otherwise change it back to relative
        if (scrollTop > stickyNavTop) { 
            $('.sticky-main-navigation').addClass('sticky');
            $('.scania-symbol-small').removeClass('hidden');
            $('.explainatory-text').addClass('hidden');
        } else {
            $('.sticky-main-navigation').removeClass('sticky'); 
            $('.scania-symbol-small').addClass('hidden');
            $('.explainatory-text').removeClass('hidden');                    
        }
    };

    stickyNav();
    // and run it again every time you scroll
    $(window).scroll(function() {
      stickyNav();
    });

    // End sticky main navigation

}

$(function() {
    init();
})

