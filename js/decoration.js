var originname = "http://218.161.115.218:8080/HouseManager";
var imagepath = "http://218.161.115.218:80";

$(function() {
	var userurl = "http://testurl.com?g=NGY5NTM1ODMtOTk0ZC00Mjk0LThjMjEtMWM3ZGI5NzA0YTQz";
	var userEncode = userurl.split("?g=");
	var encodeVal = userEncode[1];
	console.log("encode: " + encodeVal);
	decode64(encodeVal);
	
	
	$.ajax({
        url: originname + "/files/building/1",
        type: 'GET',
        success: function(data)
        {
        	for(var i = 0 ; i < data.length ; i++){
				console.log(data);
				$(".applied-deco-section").append("<div class='deco-apply-file-list col-md-12'><div class='document-title col-md-6'>"+ data[i].fileName +"</div>" +
				"<div class='document-download col-md-1'><a href='" + imagepath + data[i].url +"' download><img src='./img/download.png' alt='download' height='50'></a></div>"+
				"<div class='document-upload col-md-1'><input type='file' name='file_upload' id='file_upload'></input></div></div>");
        	};
        },
        error: function(error)
        {
			console.log("error!!!!!!");
        }
   });
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
     console.log("userToken: " + userToken) ;
     getUser(userToken);
  }
  
function getUser(userToken) {
	$("#decoAppliedDesignerName").html("");
	$("#decoAppliedDesignerMail").html("");
	$("#decoAppliedDesignerPhone").html("");
	$("#decoAppliedOverSeerName").html("");
	$("#decoAppliedOverSeerPhone").html("");
	$("#decoAppliedOverSeerMail").html("");
	$.ajaxSetup({
		beforeSend: function (request){
	        request.setRequestHeader("Authorization",  "bearer " + userToken);
	    },
	    success: function(Jdata) {
	    	alert(Jdata.id);
	    }
	});
	$.ajax({
        url: originname + "/decoration/user",
        type: 'GET',
        success: function(data)
        {
			console.log(data);
			console.log("success!!!!!!");
			//$("#decoAppliedId").append(data.designer);
			//$("#decoAppliedName").html(data.floor + " - " + data.number);
			$("#decoAppliedDesignerName").html(data.designer);
			$("#decoAppliedDesignerMail").html(data.designerPhone);
			$("#decoAppliedDesignerPhone").html(data.designerMail);
			$("#decoAppliedOverSeerName").html(data.overseer);
			$("#decoAppliedOverSeerPhone").html(data.overseerPhone);
			$("#decoAppliedOverSeerMail").html(data.overseerMail);
        },
        error: function(error)
        {
			console.log("error!!!!!!");
        }
   });
}

function fileupload() {
	alert("file upload");
}
