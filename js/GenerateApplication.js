$(document).ready(function(){
    let token = new TokenParser()
    
        if(token.isAuthenticated())
        {
            $("#btnLoginHeader").hide();
            $("#loginInformation").show();
            $("#loginInformation").text("Hoş geldiniz");
        }

        $("#btnBasvuru").click(function(e){
            if(token.isAuthenticated())
            {
                //$(location).attr('href','showApplication.html')
                //$(location).load("showApplications.html");
                window.location.href = "/ShowApplications.html"; 
            }
            else
            {
                window.location.href = "/Login.html";
            }

        });       


        $("#btnAdd").click(function(e){

            var applicationid = "";
            var name = document.getElementById("txtFirstName").value;
            var surname= document.getElementById("txtLastName").value;
            var age = parseInt(document.getElementById("txtAge").value);
            var gender = document.getElementById("txtGender").value;
            var education = document.getElementById("txtEducation").value;
            var city = document.getElementById("txtCity").value;
            var district = document.getElementById("txtDistrict").value;
            var militaryStatus = document.getElementById("txtMilitaryStatus").value;
            var programmingLanguages = document.getElementById("txtProgrammingLanguages").value;
            var certificates = document.getElementById("txtCertificates").value;
            var email = document.getElementById("txtEmail").value;
            var phone = document.getElementById("txtPhone").value;


            var app = new Application(applicationid,name,surname,age,gender,education,city,district,militaryStatus,programmingLanguages,certificates,email,phone);
            //console.log(app);

            var json = JSON.stringify(app);
            //console.log(json);

            $.ajax({
                contentType: 'application/json',
                data: json,
                dataType: 'json',
                success: function(data){
                    Swal.fire({
                        icon: 'success',
                        title: 'Başvurunuz Oluşturuldu.',
                        showConfirmButton: false,
                        timer: 1500
                        }).then(() => location.reload());
                },
                error: function(){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Your application could not saved!',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => location.reload());
                },
                processData: false,
                type: 'POST',
                url: 'http://localhost:8080/api/addApplication'
            });
    });   
    
});