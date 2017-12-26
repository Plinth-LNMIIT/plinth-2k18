 

$(".back-back-icon").click(function () {
    window.location =  window.location.origin + '/workshops';
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



