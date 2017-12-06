window.onload = function() {
  var space = new Space();
  space.init();
  window.addEventListener("orientationchange",function(){
     
    space.init();
  });
  window.addEventListener("resize", function() {
    
    space.init();
  });

  setTimeout(function(){ 

    var loader = document.getElementById('loader');
    fadeOut(loader);
    Stars();
    setTimeout(function(){
      loader.parentElement.removeChild(loader);
      $('#home').css("visibility",'visible')
      window.addEventListener("orientationchange",function(){
        
      Stars();
     });
     window.addEventListener("resize", function() {
       
      Stars();
     });
    } ,100);
   
   

   }, 4000);

};

function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}
 
function userLoginInitiate(url){
  localStorage.setItem("tempURL", location.href);
  window.location = location.origin + url;
}