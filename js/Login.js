
$(document).ready(function(){
    const tokenObject = new TokenParser();
try{
        if(tokenObject.isAuthenticated())
        {
            $("#btnLoginHeader").hide();
            $("#loginInformation").show();
            $("#loginInformation").text("Hoş geldiniz");
            window.location.href = "/ShowApplications.html";
        }

        $("#btnBasvuru").click(function(e){
            if(window.localStorage.getItem("login"))
            {
                window.location.href = "/ShowApplications.html";
 
            }
            else
            {
                window.location.href = "/Login.html";
            }
        });
    }
    catch(ex)
    {
        console.log(ex);
    }


$("#btnLogin").click(function(e){

         $.ajax({
            url: "http://localhost:8080/login",
            type: "POST",
            data:  JSON.stringify({ "username": $("#txtUserName").val(),"password":$("#txtUserPassword").val() }),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {

                /*var tokenObject = new JwtToken(result);
                //console.log(result);
                

                console.log(tokenObject.getTokenExpDate())*/

                window.document.cookie = "jwt=" + result;

               /* window.localStorage.setItem("token",result);
                window.localStorage.setItem("login",true);*/
                console.log(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Giriş Başarılı.',
                    showConfirmButton: false,
                    timer: 1500
                    })
                    //.then(() => location.reload());
                    $("#btnLoginHeader").hide();

                    $("#loginInformation").show();
                    $("#loginInformation").text("Hoş geldiniz");
                    setTimeout(function(){
                        window.location.href = "/ShowApplications.html";
                      }, 2000);
            },
            error: function (xhr, textStatus, errorThrown) {
                window.localStorage.setItem("login",false);
                Swal.fire({
                    title: 'HATA!',
                    text: 'Giriş Hatalı.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })//.then(() => location.reload());
            }
        });
        
  

});

}); 