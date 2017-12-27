
document.getElementById('register-form').onsubmit = function (e) {
    e.preventDefault();
    $('#submit-button').attr("disabled", true);
     registerUser();
 
}



function registerUser() {

    var user;
    var check = false;

 
            user = {
                phoneNumber: $('#contact_number').val(),
                college: $('#institute').val(),
                year: $('#user_year option:selected').val(),
                city: $('#user_city').val(),
                gender: $('input[type="radio"][name="gender"]:checked').val(),
                 
            };

            if (user.phoneNumber === "" ||
                user.college === "" ||
                user.year === "" ||
                user.city === "" ||
                user.gender === "") {


                check = false;
            }
            else {

                check = true;
                
            }
          

    if (check == true) {
        
      
        $.post("/user/user_register_complete",
            { postData: JSON.stringify(user) })
            .done(function (data) {
              
                if (data.status) {
                     window.location = window.location.origin + '/profile';
                } else {
                    $('#submit-button').attr("disabled", false);
                }
            }).fail(function (err) {
                alert('Sorry for any inconvenience, Try again later. If problem persists, contact query@plinth.in');
            });



    } else {
        alert('Sorry for any inconvenience, Try again later. If problem persists, contact query@plinth.in');
    }

}
 