$(".back-icon").click(function () {
   window.location =  window.location.origin + '/competitions';
});

$(".more-details").click(function () {
    next = $(this).find('div.statement').get('0').innerHTML;

    console.log(urls);
    urls.forEach(element => {

        if (element.eventName == next) {
           
            window.location =  (window.location + element.eventUrl).replace(/([^:])(\/\/+)/g, '$1/');

        }
    });
    
});

$('.wonder-away').click(function () {


    window.location =  (window.location.origin + '/workshops/scribbledstories').replace(/([^:])(\/\/+)/g, '$1/'); 

});
$('.event-away').click(function () {

    window.open("https://goo.gl/8vt44V");
     
});
