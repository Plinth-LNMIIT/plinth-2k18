
$(".astro-image").click(function(){
    $("#main-list").hide();
    $("#astronomy-list").show();
});

$(".coding-image").click(function(){
    $("#main-list").hide();
    $("#coding-list").show();
});

$(".robotics-image").click(function(){
    $("#main-list").hide();
    $("#robotics-list").show();
});

$(".quizzing-image").click(function(){
    $("#main-list").hide();
    $("#quizzing-list").show();
});

$(".literature-image").click(function(){
    $("#main-list").hide();
    $("#literature-list").show();
});

$(".management-image").click(function(){
    $("#main-list").hide();
    $("#management-list").show();
});

$(".back-icon").click(function(){
   $(".back-icon").parent().parent().parent().hide();
   $("#main-list").show();
});
 

$(".more-details").click(function(){
    next = $(this).find('div.statement').get('0').innerHTML; 
    current = $(this).parent().parent().parent().parent();
   

    mevents.forEach(element => { 
      
        if(element.eventName == next){
            mevent = element;
            
        }
    });
    if(mevent != undefined){
        $('#clubName').html(mevent.clubName); 
        $('#eventName').html(mevent.eventName); 
        $('#eventFee').html(mevent.eventFee); 
        $('#eventDate').html(mevent.eventDate); 
        $('#eventVenue').html(mevent.eventVenue); 
        $('#prizeWorth').html(mevent.prizeWorth); 
        $('#tab').html(mevent.synopsis); 
        current.hide();
        $("#details").show();
    } 
    document.body.getElementsByClassName('.scroll-content').scrollTop = 0; // For Safari
    document.documentElement.getElementsByClassName('.scroll-content').scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

$("#synopsis").click(function(){
    $("#synopsis").parent().addClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#judges").parent().removeClass("uk-active");
    $('#tab').html(mevent.synopsis); 
 });

 $("#description").click(function(){
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().addClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#judges").parent().removeClass("uk-active");
    $('#tab').html(mevent.eventDescription); 
 });


 $("#rules").click(function(){
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().addClass("uk-active");
    $("#judges").parent().removeClass("uk-active");
    $('#tab').html(mevent.rules); 
 });


 $("#judges").click(function(){
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#judges").parent().addClass("uk-active");
    $('#tab').html(mevent.judges); 
 });

 

$(".back-back-icon").click(function(){
    $(".back-back-icon").parent().parent().parent().hide();
    current.show();
 });
 
 function getNext(){
     
     console.log(next);
     
 } 