





$('#hidden-matter').hide();

$('input[type="radio"]').click(function () {
  var inputValue = $(this).attr("value");

  if (inputValue === 'IP') {


    $('#committee').find('option')
      .remove()
      .end()
      .append('<option value="IP">International Press</option>');

    $('#amount').text('Amount :₹ 900/-');
    $('#hidden-matter').show();
  } else if (inputValue === 'Delegates') {


    $('#committee').find('option')
      .remove()
      .end()
      .append('<option value="GA(DISEC)">GA(DISEC)</option>'
      + '<option value="UNHRC">UNHRC</option>'
      + '<option value="AIPPM">AIPPM</option>'
      + '<option value="UNICEF">UNICEF</option>');

    $('#amount').text('Amount :₹ 1200/-');
    $('#hidden-matter').show();
  }

});
document.getElementById('mun-form').onsubmit = function (e) {
  e.preventDefault();
  $('#submit-button').attr("disabled", true);
  registerUser();
  
}


function registerUser() {

  var teams=[];
  var check = false;
  var team = {
    name: $('#name').val(),
    phoneNumber: $('#contact').val(),
    email: $('#email').val(),
    college: $('#college').val(),
    city: $('#city').val(),
    delegation: $('input[name=typeRadio]:checked').attr('value'),
    committee: $('#committee option:selected').val(),
    portfolio: $('#portfolio').val(),
  }
  teams.push(team);

  var payDetails = {
    accomodation:$('#accomodation option:selected').val(),
    teams : teams,
  };

  if (team.name === "" || team.phoneNumber === "" || team.email === "" || team.city ==="" || team.college === "" || payDetails.accommodation === "" || team.committee === "" || team.delegation === "")
    check = false;
  else
    check = true;
  if (check) {

    var data = {
      eventName: 'MUN',
      clubName: 'MUN',
      mEmail: $('#mEmail').val(),
      details: payDetails,
    };




    $.post("/payment/register/MUN",
      { postData: JSON.stringify(data) })
      .done(function (data) {

        if (data.status) {

          setTimeout(function(){
              var name,
              form = document.createElement("form"),
              node = document.createElement("input");



            form.action = "/payment/initiate/MUN";
            form.method = 'POST';


            node.name = 'orderId';
            node.value = data.orderId;
            form.appendChild(node.cloneNode());


            form.style.display = "none";
            document.body.appendChild(form);

            form.submit();

            document.body.removeChild(form);
          },1000);
          

        } 







      }).fail(function (err) {
        $('#submit-button').removeAttr("disabled");
        alert('Sorry for any inconvenience, Try again later. If problem persists, contact payment@plinth.in');
      });





  } else {
    $('#submit-button').removeAttr("disabled");
    alert('Sorry for any inconvenience, Try again later. If problem persists, contact query@plinth.in');
  }

}


$(window).scroll(function (event) {
  var scroll = $(window).scrollTop();
  var homeHeight = $('#home').height() - 22;

  if (scroll < homeHeight) {
    $('.nav').removeClass("fixed-top");
    $('.nav').addClass("hidden");
    $('.nav').css('background', 'transparent');
  }
  else {
    $('.nav').addClass("fixed-top");
    $('.nav').removeClass("hidden");
    $('.nav').css('background-color', 'black');
  }

  // for logo    

});

// Smooth page scrooling

$(".page_scroll").click(function (event) {

  if (this.hash !== "" && this.hash !== undefined) {

    event.preventDefault();


    var hash = this.hash;


    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function () {


      window.location.hash = hash;
    });
  } else {
    return true;
  }
})


function userLoginInitiate(url) {
  localStorage.setItem("tempURL", location.href);
  window.location = location.origin + url;
}


