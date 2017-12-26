
$(".back-back-icon").click(function () {
    var url = "" + window.location;
    window.location = url.substring(0, url.lastIndexOf('/'));
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

$('#teamSize').on("change", function () {

    var teamContent = "";
    for (var i = 0; i < $(this).val(); i++) {
        if (i == 0) {
            teamContent += '<div class="uk-width-1-2@s"> <label class="uk-form-label labell-text" for="member-name-' + (i) + '">Leader Name*</label> <div class="uk-form-controls"> <input class="uk-input inputt-text" id="member-name-' + (i) + '" type="text" value="' + name + '" required> </div> </div> <div class="uk-width-1-2@s"> <label class="uk-form-label labell-text" for="member-email-' + (i) + '">Leader Email*</label> <div class="uk-form-controls"> <input class="uk-input inputt-text" id="member-email-' + (i) + '" type="email" value="' + email + '" required> </div> </div> <div class="uk-width-1-2@s"> <label class="uk-form-label labell-text" for="member-number-' + (i) + '">Leader Contact Number*</label> <div class="uk-form-controls"> <input class="uk-input inputt-text" id="member-number-' + (i) + '" type="number" value="' + contact + '" required> </div> </div> <div class="uk-width-1-2@s"> <label class="uk-form-label labell-text" for="member-college-' + (i) + '">Leader College*</label> <div class="uk-form-controls"> <input class="uk-input inputt-text" id="member-college-' + (i) + '" type="text" value="' + college + '" required> </div> </div>';
        } else {
            teamContent += '<div class="uk-width-1-2@s"> <label class="uk-form-label labell-text" for="member-name-' + (i) + '">Member ' + (i) + ' Name*</label> <div class="uk-form-controls"> <input class="uk-input inputt-text" id="member-name-' + (i) + '" type="text" required> </div> </div> <div class="uk-width-1-2@s"> <label class="uk-form-label labell-text" for="member-email-' + (i) + '">Member ' + (i) + ' Email*</label> <div class="uk-form-controls"> <input class="uk-input inputt-text" id="member-email-' + (i) + '" type="email" required> </div> </div> <div class="uk-width-1-2@s"> <label class="uk-form-label labell-text" for="member-number-' + (i) + '">Member ' + (i) + ' Contact Number*</label> <div class="uk-form-controls"> <input class="uk-input inputt-text" id="member-number-' + (i) + '" type="number" required> </div> </div> <div class="uk-width-1-2@s"> <label class="uk-form-label labell-text" for="member-college-' + (i) + '">Member ' + (i) + ' College*</label> <div class="uk-form-controls"> <input class="uk-input inputt-text" id="member-college-' + (i) + '" type="text" required> </div> </div>';
        }
    }
    $('#team-content').html(teamContent);
});

document.getElementById('register-form').onsubmit = function (e) {
    e.preventDefault();
    $('#submit-button').attr("disabled", true);
    registerUser();
 
}

function registerUser() {

    var teams = [];
    var team;
    $('#submit-button').attr("disabled", true);
    var payDetails = '';
    var check = false;

    if (mevent.payName == 'SIF') {
        if ($('input[type="radio"][name="sif_type"]:checked').val() == 'Startup') {

            team = {
                type: $('input[type="radio"][name="sif_type"]:checked').val(),
                startupName: $('#sif_startup_name').val(),
                website: $('#sif_website').val(),
                name: $('#sif_startup_contact_name').val(),
                email: $('#sif_startup_contact_email').val(),
                phoneNumber: $('#sif_startup_contact_contactNumber').val(),
                interns: $('#sif_startup_intern').val(),
                domain: $('#sif_startup_domain option:selected').val(),
            };

            if (team.startupName === "" ||
                team.website === "" ||
                team.email === "" ||
                team.name === "" ||
                team.phoneNumber === "" ||
                team.interns === "" ||
                team.domain === "") {


                check = false;
            }
            else {

                check = true;
                teams.push(team);
            }
            fee = mevent.fee.startup;
        }
        else if ($('input[type="radio"][name="sif_type"]:checked').val() == 'Student') {
            team = {
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

            if (team.name === "" ||
                team.email === "" ||
                team.phoneNumber === "" ||
                team.college === "" ||
                team.city === "" ||
                team.year === "") {


                check = false;
            }
            else {

                check = true;
                teams.push(team);
            }


            fee = mevent.fee.student;
        }

        payDetails = {
            teams: teams,
        };
    } else {
        var teamSS = $('#teamSize option:selected').val();



        for (var i = 0; i < teamSS; i++) {
            team = {
                name: $('#member-name-' + i).val(),
                email: $('#member-email-' + i).val(),
                phoneNumber: $('#member-number-' + i).val(),
                college: $('#member-college-' + i).val(),
            }
            teams.push(team);
            if (team.name === "" ||
                team.email === "" ||
                team.phoneNumber === "" ||
                team.college === "") {
                check = false;
            }
            else {
                check = true;

            }
        }
        console.log(teams);
        payDetails = {
            teamName: $('#teamName').val(),
            teamSize: $('#teamSize option:selected').val(),
            teams: teams,
            accomodation: $('#accomodation').val(),
        };

        if (payDetails.teamName === "" ||
            payDetails.teamSize === "" ||
            payDetails.teams === "" ||
            payDetails.accomodation === "") {
            check = false;
        }
        else {
            check = true;
        }
        fee = mevent.fee;
    }

    if (check == true) {
        $('#error').hide();
        var data = {
            eventName: mevent.eventName,
            clubName: mevent.clubName,
            mEmail: $('#mEmail').val(),
            details: payDetails,
        };
        $.post("/payment/register/" + mevent.payName,
            { postData: JSON.stringify(data) })
            .done(function (data) {

                if (data.status) {
                    orderId = data.orderId;
                    $('#submit-button').removeAttr("disabled");
                    UIkit.modal('#register-competitions').hide();
                    $("#payOrderId").html(orderId);
                    $("#payAmount").html(fee);
                    UIkit.modal('#pay-competitions').show();
                }
            }).fail(function (err) {
                alert('Sorry for any inconvenience, Try again later. If problem persists, contact payment@plinth.in');
            });



    } else {
        $('#error').show();
        $('#submit-button').removeAttr("disabled");
        return;
    }

}

$("#pay-button").click(function (e) {

    e.preventDefault();

    var name,
        form = document.createElement("form"),
        node = document.createElement("input");



    form.action = "/payment/initiate/" + mevent.payName;
    form.method = 'POST';


    node.name = 'orderId';
    node.value = orderId;
    form.appendChild(node.cloneNode());


    form.style.display = "none";
    document.body.appendChild(form);

    form.submit();

    document.body.removeChild(form);


});