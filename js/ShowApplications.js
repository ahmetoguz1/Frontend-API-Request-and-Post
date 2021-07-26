$(document).ready(function(){     
    let token = new TokenParser();   
    try{
        if(token.isAuthenticated())
        {
            $("#btnLoginHeader").hide();
            $("#loginInformation").show();
            $("#loginInformation").text("Hoş geldiniz");
        }
        else
        {
            window.location.href = "/Login.html";
        }
    }
    catch(ex)
    {
        console.log(ex);
        window.location.href = "/Login.html";
    }

    var value = $.ajax({
        url: "http://localhost:8080/api/applications",
        async:false,
        type: "GET",
        headers: {
          "Authorization": 'Bearer ' + getToken()
        }
      }).responseText;

    buildTable(JSON.parse(value));
    var table = $('#applications').DataTable();


    $("#btnApplyFilter").click(function(e){

        //search?ageStart=1&ageFinish=44&militaryStatus=yaptı&gender=erkek

        if($("#txtAgeStart").val() != null && $("#txtAgeFinish").val() != null && $('#drpMilitaryStatus :selected').text() != null && $('#drpGender :selected').text() != null)
        {
            var query = "search?ageStart=" + $("#txtAgeStart").val() + "&ageFinish="+ $("#txtAgeFinish").val() + "&militaryStatus=" + $('#drpMilitaryStatus :selected').text().toLowerCase() + "&gender="+ $('#drpGender :selected').text().toLowerCase();
            //console.log(query);
            var value = $.ajax({
                url: "http://localhost:8080/api/applications/" + query,
                async:false,
                type: "GET",
                headers: {
                  "Authorization": 'Bearer ' + getToken()
                }
              }).responseText;

              //console.log("GELEN VERI: " + value);            

              generateTable();             
              buildTable(JSON.parse(value));              
              $("#exampleModal .close").click()
              $('#applications').DataTable();
              
        }

    });

});

function generateTable(){
    var table = $('#applications').DataTable();
    table.destroy();
    //$('#applications').empty(); 
    try{
        var dmy = `<table class="table table-striped" id="applications"><thead>
        <th>ID</th>
        <th>Ad</th>
        <th>Soyad</th>
        <th>Yas</th>
        <th>Cinsiyet</th>
        <th>Eğitim</th>
        <th>İl</th>
        <th>İlçe</th>
        <th>Askerlik Durumu</th>
        <th>Programlama Dilleri</th>
        <th>Sertifikalara</th>
        <th>Email</th>
        <th>Telefon</th>
        </thead>
        <tbody id="myTable">      
        </tbody>
        </table>`
        var table = document.getElementById('applications')  
        table.innerHTML = dmy;    
    }
    catch(ex)
    {
        console.log(ex);
    }
}

function buildTable(data){
    var table = document.getElementById('myTable')  
    try{
        for (var i = 0; i < data.length; i++){
            var row = `<tr>
                            <td>${data[i].applicationID}</td>
                            <td>${data[i].name}</td>
                            <td>${data[i].surname}</td>
                            <td>${data[i].age}</td>
                            <td>${data[i].gender}</td>
                            <td>${data[i].education}</td>
                            <td>${data[i].city}</td>
                            <td>${data[i].district}</td>
                            <td>${data[i].militaryStatus}</td>
                            <td>${data[i].programmingLanguages}</td>
                            <td>${data[i].certificates}</td>
                            <td>${data[i].email}</td>
                            <td>${data[i].phone}</td>
                    </tr>`
            table.innerHTML += row
        }
    }
    catch(ex)
    {
        console.log(ex);
    }
}


function getCookieData(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function getToken() {
    var _st = getCookieData("jwt");
    return (_st != null) ? _st : "";
  }