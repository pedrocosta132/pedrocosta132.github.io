//same as document.ready
$(function(){

    "use strict";

    //Make necessary scroll changes on page load
    scrollChanges($(window).scrollTop());

    

    //Add animation delay to nav links dynamically
    $("header > nav > ul > li").each(function(index){
        // $(this).css({
        //      'animation-delay' : (400*index) + 'ms'
        // });
        var delay = 500 + (1000*index);
        $(this).animate({
            opacity: 1
        }, delay)
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

        if(target.length){
            //If mobile close nav menu
            if($('#mobile-nav').is(':visible'))
                $('#mobile-nav').slideToggle(200)

            //animation
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 500);
        }
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
        if(target === 'rep' && !$('#rep-list[done]').length)
            loadRepositories();

    });

    //Open/close mobile navigation bar
    $('.mobile-menu-icon, #mobile-nav-close').on('click',function(){
        $('#mobile-nav').slideToggle(200)
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
        //return;

        var rep_list = $('#rep-list'),
            list = '';

        $.get('https://api.github.com/users/pedrocosta132/repos',
        null,
        function(data, status){

            if(status == 'success' && data != null){

                rep_list.html('');

                data.forEach(d => {
                    //add to rep list
                    if(d.description == null)
                        d.description = '...';
                    for(var i = 0;i < 2;i++) //delete this line - testing exclusive
                        list += `<li><a target="_blank" href="${d.html_url}">${d.name} <i class="fas fa-link"></i></a><p>${d.description}</p></li>`;
                });

            }else

                rep_list.html('<li>No repository found</li>');  

        }).fail(function(xhr){
            console.log("Error " + xhr.status + " - " + xhr.statusText);
            rep_list.html('<li>No repository found</li>');  
        })
        .done(function(){
            $('#rep-list').attr( 'done', true )
            setTimeout( function(){ 
                $('.loading').fadeOut().promise().done(function(){
                    rep_list.html(list);
                    rep_list.fadeIn(); 
                });   
            }  , 1000 );
            
        });
    }

});