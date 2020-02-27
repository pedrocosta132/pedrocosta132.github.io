//same as document.ready
$(function(){

    "use strict";

    //Make necessary scroll changes on page load
    scrollChanges($(window).scrollTop());

    

    //Add animation delay to nav links dynamically
    $("header > nav > ul > li").each(function(index){
        $(this).css({
             'animation-delay' : (400*index) + 'ms'
        });
    });

    //----------LISTENERS----------

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
    $('a[href^="#"]').not('[href="#0"]').not('[href="#"]').on('click',function(event){
        event.preventDefault();

        var target = $($(this).attr('href'));

        if(target.length)
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 500);
    });

    //Portfolio section navigation
    $('#portfolio-nav > a').on('click',function(){
        var target = $(this).attr('for'),
            toShow = $('#portfolio > .content[data-target="' + target + '"');
        
        if(!toShow.length)
            //return;
        console.log('existe');
        //navigation
        $('#portfolio-nav > a.active').removeClass('active');
        $(this).addClass('active');
        $('#portfolio-selector').animate({'margin-top': $(this).position().top}, 500);

        //content
        // $('#portfolio > .content').fadeOut('fast').promise().done(function(){
        //     toShow.css('display','flex').hide().fadeIn('fast');
        // });
        $('#portfolio > .content').hide();
        toShow.css('display','flex').hide().fadeIn(1000);

        //Load repositories
        var attr = $('#rep-list').attr('done');
        if(target === 'rep' && (typeof attr === typeof undefined || attr === false))
            loadRepositories();
    });

    //----------FUNCTIONS----------

    //Scroll changes
    function scrollChanges(position){
        //console.log(position);

        //Header on scroll
        $('header').toggleClass('scrolled', position > 100);

        
    }

    //Load my public repositories from github
    function loadRepositories(){
        console.log('cenas');
        return;
        $.get(url,
        null,
        function(data, status){

            console.log(data);

            var rep_list = $('#rep-list');
            //data = null;
            if(status == 'success' && data != null){
                $('#rep-list img').hide('normal');
                rep_list.html('');
                data.forEach(d => {
                    //add to rep list
                    if(d.description == null)
                        d.description = '...';
                    //rep_list.append(`<li><a target="_blank" href="${d.html_url}">${d.name} <i class="fas fa-link"></i></a><p>${d.description}</p></li>`);
                    console.log(d.name);
                });
            }else
                rep_list.html('<li>No repository found</li>');  

        }).fail(function(xhr){
            console.log("Error " + xhr.status + " - " + xhr.statusText);
        });
    }

});