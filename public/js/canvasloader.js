window.onload = function() {
  var loader = document.getElementById('loader');
  
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
      },1000);
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
 
    
$(".hexagon-hidden").mouseenter (
  function () {
    $(this).removeClass("hover");
  }
);

$(".hexagon-hidden").mouseleave (
  function () {
    $(this).addClass("hover");
  }
);
   
   