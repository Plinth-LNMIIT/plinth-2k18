

var $form = $('form#contact-form'),
url = 'https://script.google.com/macros/u/1/s/AKfycbyB4_xa1pfu17YEbGT76howphOHKIdVYiyiM71Ng-fpKcXypD15/exec'

$('#submit-form').on('click', function(e) {
e.preventDefault();

$.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject(),					
    success: function(data) {
        console.log('success');
     
    }
});

 
});