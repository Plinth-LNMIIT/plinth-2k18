

 



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

  $('#register-button').click(function () {
    registerUser();
  });
  function getDetails() {
    var payDetail = {
      name: $('#name').val(),
      phoneNumber: $('#contact').val(),
      email: $('#email').val(),
      college: $('#college').val(),
      city: $('#city').val(),
      delegation: $('input[name=typeRadio]:checked').attr('value'),
      committee: $('#committee option:selected').val(),
      portfolio: $('#portfolio').val(),
      accommodation: $('#accomodation option:selected').val(),
    }

    return payDetail;

  }

  function validate(data) {
    if (data.name === "" || data.phoneNumber === "" || data.email === "" || data.college === "" || data.accommodation === "" || data.committee === "" || data.portfolio === "" || data.delegation === "")
      return false;
    else
      return true;
  }

  function registerUser() {

    var payDetails = getDetails();
    if (validate(payDetails)) {

      var data = {
        eventName: 'MUN',
        teamSize: 1,
        details: payDetails,
      };

      var name,
        form = document.createElement("form"),
        node = document.createElement("input");

       

      form.action = "/payment/initiate/MUN";
      form.method = 'POST';

      
        node.name = 'data';
        node.value = JSON.stringify(data);
        form.appendChild(node.cloneNode());
      

      // To be sent, the form needs to be attached to the main document.
      form.style.display = "none";
      document.body.appendChild(form);

      form.submit();

      // Once the form is sent, remove it.
      document.body.removeChild(form);

   /*    $.post("/payment/initiate",
        data,
        function (data, status) {

        }).fail(function () {
          alert('Sorry for any inconvenience, Try again later. If problem persists, contact query@plinth.in');
        }); */


    } else {
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

    if (this.hash !== ""  && this.hash !== undefined) {

      event.preventDefault();


      var hash = this.hash;


      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {


        window.location.hash = hash;
      });
    } else{
      return true;
    }
  })


  function userLoginInitiate(url) {
    localStorage.setItem("tempURL", location.href);
    window.location = location.origin + url;
  }


 