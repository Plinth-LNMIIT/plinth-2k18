

var $form = $('form#contact-form'),
url = 'https://script.google.com/macros/s/AKfycbyB4_xa1pfu17YEbGT76howphOHKIdVYiyiM71Ng-fpKcXypD15/exec'


document.getElementById('contact-form').onsubmit= function(e){
    e.preventDefault();
    $('#submit-form').attr("disabled", true);
    $.ajax({
        url: url,
        method: "GET",
        data: $form.serializeObject(),					
        success: function(data) {
            $('#contact-form').hide();
            $('#form-response').removeClass('uk-hidden');
            $('#submit-form').removeAttr("disabled");
         
        }
    });
}

 