/*!
 * Javascript Add Ons to Scania Bootstrap
 */

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

function init() {
    var cookie_scaniaBootstrap_maximize = getMaximizeCookie("scaniaBootstrap_maximize");

    $("body").append("<button class='btn btn-sm btn-default hidden' type='button' id='restore-button'><span class='small-menu'><i class='icon-reorder'></i><br/><i class='icon-cog'></i></span></button>")

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
}

$(function() {
    init();
})