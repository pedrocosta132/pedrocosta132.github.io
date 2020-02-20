$(function(){

    "use strict";

    $("header > nav > ul > li").each(function(index){
        $(this).css({
             'animation-delay' : (400*index) + 'ms';
        });
    });

});