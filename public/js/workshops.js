 

$(".back-back-icon").click(function () {
    $(".back-back-icon").parent().parent().parent().hide();
    $("#main-list").show();
});

$(".more-details").click(function () {
    next = $(this).find('div.statement').get('0').innerHTML;
    mevents.forEach(element => {

        if (element.eventName == next) {
            mevent = element;

        }
    });
    if (mevent != undefined) {
        $("#main-list").hide();
        $('#clubName').html(mevent.clubName);
        $('#eventName').html(mevent.displayName);
        $('#eventDate').html(mevent.eventDate);
        $('#eventVenue').html(mevent.eventVenue); 
     
        if(mevent.sponsors == null){
            $("#sponsors").hide();
        }else{
            $("#sponsors").show();
        }

        if( mevent.eventFee == null){
            $("#fees").hide();
        }else{
            $("#fees").show();
            $('#eventFee').html(mevent.eventFee);
        }

        if(mevent.synopsis == null){
            $("#synopsis").hide();
            $('#tab').html(mevent.eventDescription);
            $("#synopsis").parent().removeClass("uk-active");
            $("#description").parent().addClass("uk-active");
        } else {
            $("#synopsis").show();
            $('#tab').html(mevent.synopsis);
            $("#synopsis").parent().addClass("uk-active");
            $("#description").parent().removeClass("uk-active");
        }

        if(mevent.eventDescription == null){

           $("#description").hide();
            
        }else{
            $("#description").show();
      
        }
        if(mevent.workshopContent == null){

           $("#workshopContent").hide();
            
        }else{
            $("#workshopContent").show();
      
        }
        if(mevent.highlights == null){

           $("#highlights").hide();
            
        }else{
            $("#highlights").show();
      
        }
        if(mevent.benefits == null){

           $("#benefits").hide();
            
        }else{
            $("#benefits").show();
      
        }
        

        if(mevent.rules == null){

           $("#rules").hide();
            
        }else{
            $("#rules").show();
      
        }

      
       
        $("#workshopContent").parent().removeClass("uk-active");
        $("#highlights").parent().removeClass("uk-active");
        $("#benefits").parent().removeClass("uk-active");
        $("#rules").parent().removeClass("uk-active");
        $("#contact").parent().removeClass("uk-active");
        $("#sponsors").parent().removeClass("uk-active");
        $("#details").show();
    }
    $('html,body,div').animate({
        scrollTop: $(this).offset().top},
        'slow');
});

$("#synopsis").click(function () {
    $("#synopsis").parent().addClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#contact").parent().removeClass("uk-active");
    $("#sponsors").parent().removeClass("uk-active");
    $("#workshopContent").parent().removeClass("uk-active");
    $("#highlights").parent().removeClass("uk-active");
    $("#benefits").parent().removeClass("uk-active");
    $('#tab').html(mevent.synopsis);
});

$("#description").click(function () {
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().addClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#contact").parent().removeClass("uk-active");
    $("#sponsors").parent().removeClass("uk-active");
    $("#workshopContent").parent().removeClass("uk-active");
    $("#highlights").parent().removeClass("uk-active");
    $("#benefits").parent().removeClass("uk-active");
    $('#tab').html(mevent.eventDescription);
});


$("#rules").click(function () {
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().addClass("uk-active");
    $("#contact").parent().removeClass("uk-active");
    $("#sponsors").parent().removeClass("uk-active");
    $("#workshopContent").parent().removeClass("uk-active");
    $("#highlights").parent().removeClass("uk-active");
    $("#benefits").parent().removeClass("uk-active");
    $('#tab').html(mevent.rules);
});


$("#highlights").click(function () {
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#contact").parent().removeClass("uk-active");
    $("#sponsors").parent().removeClass("uk-active");
    $("#workshopContent").parent().removeClass("uk-active");
    $("#highlights").parent().addClass("uk-active");
    $("#benefits").parent().removeClass("uk-active");
    $('#tab').html(mevent.highlights);
});

$("#contact").click(function () {
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#contact").parent().addClass("uk-active");
    $("#sponsors").parent().removeClass("uk-active");
    $("#workshopContent").parent().removeClass("uk-active");
    $("#highlights").parent().removeClass("uk-active");
    $("#benefits").parent().removeClass("uk-active");
    $('#tab').html(mevent.query);
});

$("#sponsors").click(function () {
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#contact").parent().removeClass("uk-active");
    $("#sponsors").parent().addClass("uk-active");
    $("#workshopContent").parent().removeClass("uk-active");
    $("#highlights").parent().removeClass("uk-active");
    $("#benefits").parent().removeClass("uk-active");
    $('#tab').html(mevent.sponsors);
});
$("#benefits").click(function () {
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#contact").parent().removeClass("uk-active");
    $("#sponsors").parent().removeClass("uk-active");
    $("#workshopContent").parent().removeClass("uk-active");
    $("#highlights").parent().removeClass("uk-active");
    $("#benefits").parent().addClass("uk-active");
    $('#tab').html(mevent.benefits);
});
$("#workshopContent").click(function () {
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#contact").parent().removeClass("uk-active");
    $("#sponsors").parent().removeClass("uk-active");
    $("#workshopContent").parent().addClass("uk-active");
    $("#highlights").parent().removeClass("uk-active");
    $("#benefits").parent().removeClass("uk-active");
    $('#tab').html(mevent.workshopContent);
});



