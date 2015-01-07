$(function() {
	var userurl = "http://testurl.com?g=ZjIwNmQ2MjAtZGFmZi00YWFmLTg4NTktNDhiNjY4ZDhiOTNh";
	var userEncode = userurl.split("?g=");
	console.log(userEncode[1]);
	var encodeVal = userEncode[1];
	console.log("encode: " + encodeVal);
	decode64(encodeVal);
});
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" + "=";

var userToken;
function decode64(input) {
     var output = "";
     var chr1, chr2, chr3 = "";
     var enc1, enc2, enc3, enc4 = "";
     var i = 0;
     // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
     var base64test = /[^A-Za-z0-9\+\/\=]/g;
     if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n" +
              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
              "Expect errors in decoding.");
     }
     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
     do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
           output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
           output = output + String.fromCharCode(chr3);
        }
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
     } while (i < input.length);
     userToken = unescape(output);
     console.log(unescape(output)) ;
     console.log("userToken: " + userToken) ;
     getUser(userToken);
  }
  
function getUser(userToken) {
	$.ajaxSetup({
		beforeSend: function (request){
	        request.setRequestHeader("Authorization",  "bearer " + userToken);
	        request.setRequestHeader("token", userToken);
	    },
	    success: function(Jdata) {
	    	alert(Jdata.id);
	    }
	});
	$.ajax({
            url: "http://218.161.115.218:8080/HouseManager/decoration/user",
            type: 'GET',
            success: function(data)
            {
				console.log("success!!!!!!");
            },
            error: function(error)
            {
				console.log("error!!!!!!");
            }
        })
}
