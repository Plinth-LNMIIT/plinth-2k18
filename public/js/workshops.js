 

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



$('#error').hide();

var orderId;
var fee;

document.getElementById('register-form').onsubmit = function (e) {
    e.preventDefault();

    $('#submit-button').attr("disabled", true);
   
     registerUser();
 
}



function registerUser() {

    var teams = [];
    var team;
 
    var payDetails = '';
    var check = false;

   
    team = {
        name: $('#name' ).val(),
        email: $('#email' ).val(),
        phoneNumber: $('#number' ).val(),
        college: $('#college' ).val(),
        collegeId: $('#collegeid' ).val(),
    };

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
 
    payDetails = {
        teamSize: '1',
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
  
    
  

    if (check == true) {
        $('#error').hide();
        var data = {
            eventName: mevent.eventName,
            clubName: mevent.clubName,
            mEmail: $('#mEmail').val(),
            referrer:$('#referral').val(),
            details: payDetails,
        };
        $.post("/payment/register/" + mevent.payName,
            { postData: JSON.stringify(data) })
            .done(function (data) {
                document.getElementById("register-form").reset();
                if (data.status) {
                    orderId = data.orderId;
                    $('#submit-button').removeAttr("disabled");
                    UIkit.modal('#register-workshops').hide();
                    $("#payOrderId").html(orderId);
                    $("#payAmount").html(fee);
                    UIkit.modal('#pay-workshops').show();
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

$("#cancel-button").click(function (e) {
    e.preventDefault();
    window.location =  (window.location.origin + '/profile').replace(/([^:])(\/\/+)/g, '$1/'); 

});

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