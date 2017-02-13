
/*!
 * Javascript Add Ons to Scania Bootstrap
 */

console = console || {};

console.log("You are linking to a development version of the Scania Bootstrap JavaScript, if you are using this in your production environment, please change your reference to https://static.scania.com/build/global/1.8.1/js/scania-bootstrap.js");

function setMaximizeCookie(i, e, a) {
    if (a) {
        var o = new Date;
        o.setTime(o.getTime() + 1e3 * 60 * 60 * 24 * a);
        var t = "; expires=" + o.toGMTString()
    } 
    document.cookie = i + "=" + e + t + "; path=/"
}

function getMaximizeCookie(i) {
    for (var e = i + "=", a = document.cookie.split(";"), o = 0; o < a.length; o++) {
        for (var t = a[o];
            " " == t.charAt(0);) t = t.substring(1, t.length);
        if (0 == t.indexOf(e)) return t.substring(e.length, t.length)
    }
    return null
}

function chartResize() {
    if(!!$.prototype.highcharts) {
        $(".highcharts-container").parent().each(function() {
            var chart = $(this).highcharts(); // target the chart itself
            chart.reflow() // reflow that chart
        });
    }
}

/*!
 * Shortcuts M for Maxize
 */    
function bindCtrlM(){

    $(document).on('keydown', function(e) {
        if ((e.metaKey || e.ctrlKey) && ( String.fromCharCode(e.which).toLowerCase() === 'm') ) {
            $('body').toggleClass('maximized');
            $('#restore-button').removeClass('hidden');

            chartResize();

            $('body').hasClass('maximized') ? setMaximizeCookie('scaniaBootstrap_maximize', 'maximized', 90000) : setMaximizeCookie('scaniaBootstrap_maximize', 'minimized', 90000);
        }
    });
}

function init() {


    $("body").append("<button class='btn btn-sm btn-default hidden' type='button' id='restore-button'><span class='small-menu'><i class='icon-menu-svg'></i><span class='menu-text'>MAIN MENU</span></span></button>");

    // Emphasizing the main menu restor button


    function mainMenuSlideOut(){
       $( "#restore-button" ).addClass( "slide-out-right" );
    }
        setTimeout(mainMenuSlideOut, 700);
       
    // End emphasizing 


    var cookie_scaniaBootstrap_maximize = getMaximizeCookie("scaniaBootstrap_maximize");


    if(cookie_scaniaBootstrap_maximize === "maximized"){
        $("body").addClass("maximized");
        $("#restore-button").removeClass("hidden");
        chartResize();
    }
    $("#maximize-button").click(function() {
        $("body").toggleClass("maximized");
        $("#restore-button").removeClass("hidden");

        chartResize();

        $("body").hasClass("maximized") ? setMaximizeCookie("scaniaBootstrap_maximize", "maximized", 90000) : setMaximizeCookie("scaniaBootstrap_maximize", "minimized", 90000)
     });   


    $("#restore-button").click(function() {
        $("body").removeClass("maximized");
        $("#restore-button").addClass("hidden");

        chartResize();

        $("body").hasClass("maximized") ? setMaximizeCookie("scaniaBootstrap_maximize", "maximized", 90000) : setMaximizeCookie("scaniaBootstrap_maximize", "minimized", 90000)
    }); 


    $('.teaser-title').each(function() {
        if($(this).text().length > 50) {
            $(this).css({'font-family': 'ScaniaSansBold', 'text-transform': 'initial'}) }
        else if ($(this).text().length > 30) {
            $(this).css({'font-family': 'ScaniaSansHeadlineRegular'})
        }   
    })

    bindCtrlM();
}

$(function() {
    init();
})