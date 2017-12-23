
$(".astro-image").click(function () {
    $("#main-list").hide();
    $("#astronomy-list").show();
    $('html,body,div').animate({
        scrollTop: $(this).offset().top
    },
        'slow');
});

$(".coding-image").click(function () {
    $("#main-list").hide();
    $("#coding-list").show();
    $('html,body,div').animate({
        scrollTop: $(this).offset().top
    },
        'slow');
});

$(".robotics-image").click(function () {
    $("#main-list").hide();
    $("#robotics-list").show();
    $('html,body,div').animate({
        scrollTop: $(this).offset().top
    },
        'slow');
});

$(".quizzing-image").click(function () {
    $("#main-list").hide();
    $("#quizzing-list").show();
    $('html,body,div').animate({
        scrollTop: $(this).offset().top
    },
        'slow');
});

$(".literature-image").click(function () {
    $("#main-list").hide();
    $("#literature-list").show();
    $('html,body,div').animate({
        scrollTop: $(this).offset().top
    },
        'slow');
});

$(".management-image").click(function () {
    $("#main-list").hide();
    $("#management-list").show();
    $('html,body,div').animate({
        scrollTop: $(this).offset().top
    },
        'slow');
});

$(".back-icon").click(function () {
    $(".back-icon").parent().parent().parent().hide();
    $("#main-list").show();
});


$(".more-details").click(function () {
    next = $(this).find('div.statement').get('0').innerHTML;
    current = $(this).parent().parent().parent().parent();


    mevents.forEach(element => {

        if (element.eventName == next) {
            mevent = element;

        }
    });
    if (mevent != undefined) {
        current.hide();
        $('#clubName').html(mevent.clubName);
        $('#eventName').html(mevent.displayName);

        $('#eventDate').html(mevent.eventDate);
        $('#eventVenue').html(mevent.eventVenue);

        if (mevent.eventName == 'StartUp Intern Fair') {

            $("#judges").text('Registered Statups');

        } else {

            $("#judges").text('Judges & Mentors');
        }
        if (mevent.sponsors == null) {
            $("#sponsors").hide();
        } else {
            $("#sponsors").show();
        }

        if (mevent.eventFee == null) {
            $("#fees").hide();
        } else {
            $("#fees").show();
            $('#eventFee').html(mevent.eventFee);
        }

        if (mevent.prizeWorth == null) {
            $("#prizes").hide();
        } else {
            $("#prizes").show();
            $('#prizeWorth').html(mevent.prizeWorth);
        }

        if (mevent.synopsis == null) {
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
        if (mevent.judges == null) {
            $("#judges").hide();

        } else {

            $("#judges").show();
        }

        if (mevent.paymentURL == null) {
            $("#payment").hide();
        } else {
            $("#payment").show();
        }

        if (mevent.otherURL == null) {
            $("#other").hide();
        } else {
            $("#other").show();
            $("#oUrl").attr("href", mevent.otherURL);
        }

        if (mevent.rules == null) {

            $("#rules").hide();

        } else {
            $("#rules").show();

        }

        if (mevent.eventDescription == null) {

            $("#description").hide();

        } else {
            $("#description").show();

        }

        $("#rules").parent().removeClass("uk-active");
        $("#judges").parent().removeClass("uk-active");
        $("#contact").parent().removeClass("uk-active");
        $("#sponsors").parent().removeClass("uk-active");
        $("#details").show();
    }
    $('html,body,div').animate({
        scrollTop: $(this).offset().top
    },
        'slow');
});

$("#synopsis").click(function () {
    $("#synopsis").parent().addClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#judges").parent().removeClass("uk-active");
    $("#contact").parent().removeClass("uk-active");
    $("#sponsors").parent().removeClass("uk-active");
    $('#tab').html(mevent.synopsis);
});

$("#description").click(function () {
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().addClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#judges").parent().removeClass("uk-active");
    $("#contact").parent().removeClass("uk-active");
    $("#sponsors").parent().removeClass("uk-active");
    $('#tab').html(mevent.eventDescription);
});


$("#rules").click(function () {
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().addClass("uk-active");
    $("#judges").parent().removeClass("uk-active");
    $("#contact").parent().removeClass("uk-active");
    $("#sponsors").parent().removeClass("uk-active");
    $('#tab').html(mevent.rules);
});


$("#judges").click(function () {
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#judges").parent().addClass("uk-active");
    $("#contact").parent().removeClass("uk-active");
    $("#sponsors").parent().removeClass("uk-active");
    $('#tab').html(mevent.judges);
});

$("#contact").click(function () {
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#judges").parent().removeClass("uk-active");
    $("#contact").parent().addClass("uk-active");
    $("#sponsors").parent().removeClass("uk-active");
    $('#tab').html(mevent.query);
});

$("#sponsors").click(function () {
    $("#synopsis").parent().removeClass("uk-active");
    $("#description").parent().removeClass("uk-active");
    $("#rules").parent().removeClass("uk-active");
    $("#judges").parent().removeClass("uk-active");
    $("#contact").parent().removeClass("uk-active");
    $("#sponsors").parent().addClass("uk-active");
    $('#tab').html(mevent.sponsors);
});



$(".back-back-icon").click(function () {
    $(".back-back-icon").parent().parent().parent().hide();
    current.show();
});

$('.wonder-away').click(function () {


    window.location.href = 'workshops';

});


$("#registerB").click(function (e) {

    e.preventDefault();

    $(".eName").html(mevent.displayName);
    
    $(".content-hide").hide();
    $("#"+mevent.payName+"-content").show();
    UIkit.modal('#register-competitions').show();
});

$('#startupContent').hide();
$('#studentContent').hide();

$('input[type="radio"][name="sif_type"]').click(function () {
    var inputValue = $('input[type="radio"][name="sif_type"]:checked').val();

    if (inputValue === 'Startup') {
        $('#startupContent').show();
        $('#studentContent').hide();
    } else if (inputValue === 'Student') {
        $('#studentContent').show();
        $('#startupContent').hide();
    }

});

$('#error').hide();
var orderId;
var fee;
$("#submit-button").click(function (e) {

    e.preventDefault();
   
    var payDetails = '';
    var check = false;
    var teamSizee = 1;
    switch (mevent.payName) {
        case 'SIF':
            if ($('input[type="radio"][name="sif_type"]:checked').val() == 'Startup') {
                payDetails = {
                    type: $('input[type="radio"][name="sif_type"]:checked').val(),
                    startupName: $('#sif_startup_name').val(),
                    website: $('#sif_website').val(),
                    name: $('#sif_startup_contact_name').val(),
                    email: $('#sif_startup_contact_email').val(),
                    phoneNumber: $('#sif_startup_contact_contactNumber').val(),
                    interns: $('#sif_startup_intern').val(),
                    domain: $('#sif_startup_domain option:selected').val(),
                };

                if (payDetails.startupName === "" ||
                    payDetails.website === "" ||
                    payDetails.email === "" ||
                    payDetails.name === "" ||
                    payDetails.phoneNumber === "" ||
                    payDetails.interns === "" ||
                    payDetails.domain === "") {

                  
                    check = false;
                }
                else {
                   
                    check = true;
                }
                fee = mevent.fee.startup;
            }
            else if ($('input[type="radio"][name="sif_type"]:checked').val() == 'Student') {
                payDetails = {
                    type: $('input[type="radio"][name="sif_type"]:checked').val(),
                    name: $('#sif_student_name').val(),
                    email: $('#sif_student_email').val(),
                    phoneNumber: $('#sif_student_contactNumber').val(),
                    college: $('#sif_student_college').val(),
                    city: $('#sif_student_city').val(),
                    resume: $('#sif_student_resume').val(),
                    linkedin: $('#sif_student_linkedin').val(),
                    year: $('#sif_student_year option:selected').val(),
                };
                
                if (payDetails.name === "" ||
                    payDetails.email === "" ||
                    payDetails.phoneNumber === "" ||
                    payDetails.college === "" ||
                    payDetails.city === "" ||
                    payDetails.year === "") {
                        
                   
                    check = false;
                }
                else {
                   
                    check = true;
                }
                fee = mevent.fee.student;
            }
             
            teamSizee = 1;
            break;
        case 'INT':
             
            break;
        case 'AH':
             
            break;
        case 'AQ':
             
            break;
        case 'RST':
             
            break;
        case 'IUPC':
             
            break;
        case 'ENCS':
             
            break;
        case 'BQ':
             
            break;
        case 'GQ':
             
            break;
        case 'RW':
             
            break;
        case 'RS':
             
            break;
        case 'DO':
             
            break;
        case 'LFR':
             
            break;
        case 'MS':
             
            break;
        case 'RR':
             
            break;
        case 'RCP':
             
            break;
        case 'TP':
             
            break;
        default:

            break;
    }

    if (check == true) {
        $('#error').hide();


        var data = {
            eventName: mevent.eventName,
            mEmail: $('#mEmail').val(),
            teamSize: teamSizee,
            details: payDetails,
        };
        $.post("/payment/register/" + mevent.payName,
            { postData: JSON.stringify(data) })
            .done(function (data) {

                if (data.status) {
                    orderId = data.orderId;

                    UIkit.modal('#register-competitions').hide();
                    $("#payOrderId").html(orderId);
                    $("#payAmount").html(fee);
                    UIkit.modal('#pay-competitions').show();
                }
            }).fail(function (err) {
                alert('Sorry for any inconvenience, Try again later. If problem persists, contact payment@plinth.in');
            });



    }else{
        $('#error').show();
        return;
    }

});

$("#pay-button").click(function (e) {

    e.preventDefault();

    var name,
    form = document.createElement("form"),
    node = document.createElement("input");



  form.action = "/payment/initiate/"+mevent.payName;
  form.method = 'POST';


  node.name = 'orderId';
  node.value = orderId;
  form.appendChild(node.cloneNode());


  form.style.display = "none";
  document.body.appendChild(form);

  form.submit();

  document.body.removeChild(form);


});