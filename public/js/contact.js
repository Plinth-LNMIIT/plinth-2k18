

var $form = $('form#contact-form'),
url = 'https://script.google.com/macros/s/AKfycbyB4_xa1pfu17YEbGT76howphOHKIdVYiyiM71Ng-fpKcXypD15/exec'

$('#submit-form').on('click', function(e) {
e.preventDefault();

$.ajax({
    url: url,
    method: "GET",
    data: $form.serializeObject(),					
    success: function(data) {
        console.log('success');
     
    }
});

 
});