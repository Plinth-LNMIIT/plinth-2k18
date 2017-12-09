var current;
var next;
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
   var some =  $(".back-icon").parent().parent().parent().hide();
   $("#main-list").show();
});

/* var current;

$(".more-details").click(function(){
    next = $(this).find('div.statement').get('0').innerHTML; 
    current = $(this).parent().parent().parent().parent();
    current.hide();

    events.forEach(element => { 
      
        if(element.eventName == next){
            event = element;
        }
    });
    $("#details").show();
});


$(".back-back-icon").click(function(){
    var some =  $(".back-back-icon").parent().parent().parent().hide();
    current.show();
 });
 
 function getNext(){
     
     console.log(next);
     
 } */