

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

$(".into-image").click(function(){
    $("#astronomy-list").hide();
    $("#astronomy-details").show();
});


$(".astro-back-icon").click(function(){
    var some =  $(".astro-back-icon").parent().parent().parent().hide();
    $("#astronomy-list").show();
 });

 