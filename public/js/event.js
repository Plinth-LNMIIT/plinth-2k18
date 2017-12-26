 
$(".back-back-icon").click(function () {
    var url = "" + window.location;
    window.location =  url.substring(0, url.lastIndexOf('/'));
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


$('#startupContent').hide();
$('#studentContent').hide();
$('#error').hide();

var orderId;
var fee;

$("#registerB").click(function (e) {

    e.preventDefault();

    $(".content-hide").hide();
    $("#"+mevent.payName+"-content").show();
    UIkit.modal('#register-competitions').show();
});


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
        case 'BW':
             
            break;
        case 'TQ':
             
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