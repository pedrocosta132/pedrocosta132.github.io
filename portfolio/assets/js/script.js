//same as document.ready
$(function(){

    "use strict";

    //Make necessary scroll changes on page load
    scrollChanges($(window).scrollTop());

    //----------LISTENERS----------

    //Add animation delay to nav links dynamically
    $("header > nav > ul > li").each(function(index){
        $(this).css({
             'animation-delay' : (400*index) + 'ms'
        });
    });

    //On scroll actions
    $(window).on('scroll load',function(){

        var position =  $(this).scrollTop();
        //console.log('Current position: ' + position);

        scrollChanges(position);
    });

    //Change timeline active element on click
    $('.timeline > a').on('click',function(){

        $('.timeline > a').removeClass('timeline-active');
        $(this).addClass('timeline-active');

    });

    //Smooth scroll
    $('.timeline a[href^="#"], nav a[href^="#"]').not('[href="#0"]').on('click',function(event){
        event.preventDefault();

        var target = $($(this).attr('href'));

        if(target.length)
            $('html,body').animate({
                scrollTop: target.offset().top - 64
            }, 500);
    });

    //----------FUNCTIONS----------

    //Scroll changes
    function scrollChanges(position){
        console.log(position);

        //Header on scroll
        $('header').toggleClass('scrolled', position > 100);

        //Showing/hiding timeline
        $('.timeline').toggleClass('active', position > 675);
    }

});