

var $form = $('form#ca-form'),
url = 'https://script.google.com/macros/s/AKfycbzNa7IXdkMNQ3Phi8eNEzI-r-IAHlX5_jEAndEzJy71pgxs44Q/exec'


document.getElementById('ca-form').onsubmit= function(e){
    e.preventDefault();
    $.ajax({
        url: url,
        method: "GET",
        data: $form.serializeObject(),					
        success: function(data) {
            $('#ca-form').hide();
            $('#form-response').removeClass('uk-hidden');
           
         
        }
    });
}

 