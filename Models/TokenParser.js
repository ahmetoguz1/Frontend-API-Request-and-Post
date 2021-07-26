class TokenParser{


  constructor() {
  }

  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

getTokenExpDate() {
  return this.parseJwt(this.getToken()).exp;
}


getCookieData(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

getToken() {
  var _st = this.getCookieData("jwt");
  return (_st != null) ? _st : "";
}

asd()
{
  return "sa";
}

isAuthenticated () {
  if(this.token !== null && this.getTokenExpDate() >= new Date().getTime() / 1000 ) {
      return true;
  }
  return false;
}

}