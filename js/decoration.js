var originname = "http://218.161.115.218:8080/HouseManager";
var imagepath = "http://218.161.115.218:80";

$(function() {
	//var userurl = window.location.href;
	var userurl = 'http://218.161.115.218/illuminDecoration?g=Mzg0MTg3MjQtMjU5YS00Yzg1LTg5ZmUtYjEwNGRjOWY1YWJl';
	var userEncode = userurl.split("?g=");
	var encodeVal = userEncode[1];
	// console.log("encode: " + encodeVal);
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
     // console.log("userToken: " + userToken) ;
     getUser(userToken);
     //getUser('fe4b4194-c5ad-4b02-83b3-b01d6cfc7121');
}

var decoID;
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
			// console.log(data);
			console.log("success!!!!!!");
			$("#decoAppliedId").append(data.id);
			$("#decoAppliedName").html(data.houseFloor + " - " + data.houseNumber);
			$("#decoAppliedDesignerName").html(data.designer);
			$("#decoAppliedDesignerMail").html(data.designerPhone);
			$("#decoAppliedDesignerPhone").html(data.designerMail);
			$("#decoAppliedOverSeerName").html(data.overseer);
			$("#decoAppliedOverSeerPhone").html(data.overseerPhone);
			$("#decoAppliedOverSeerMail").html(data.overseerMail);
			decoID = data.id;
			getTempfile(decoID);
        },
        error: function(error)
        {
			console.log("error!!!!!!");
        }
   });
}

function getTempfile(decoID){
	var tempfilearray = [];
	$.ajax({
        url: originname + "/files/building/1",
        type: 'GET',
        success: function(data)
        {
        	for(var i = 0 ; i < data.length ; i++){
				// console.log("decoration id: " +decoID);
				console.log(data);
				$(".applied-deco-section").append("<div class='deco-apply-file-list col-md-12'><div class='document-title col-md-5'><h4>"+ data[i].fileName +"</h4></div>" +
				"<div class='document-download col-md-1'><a href='" + imagepath + data[i].url +"' download><img src='./img/download.png' alt='download' height='50'></a></div>"+
				"<div class='document-upload col-md-1'><input type='file' class='file-upload' id='file_upload" + decoID + data[i].id + "'></input></div>" +
				"<div class='document-fileName col-md-2' display='none'><input class='form-control' type='text' id='filename" + data[i].id + "' value='" + data[i].fileName + "'></input></div>" +
				"<div class='document-submit-" + data[i].id + " col-md-1'><button class='btn btn-default' onclick='fileupload(" + decoID +"," + data[i].id + ")'>上傳</button></div>" +
				// "<div class='document-pdf col-md-1'><input type='image' src='img/pdf1.png' onclick='fileupload(" + decoID +"," + data[i].id + ")' style='height:40px;'></input><div></div>");
				"<div class='document-pdf-" + data[i].id + " col-md-1'><img src='img/pdf1.png' height='40'/><div></div>");
				//"<div class='document-accept-" + data[i].id + " col-md-1'><img src='img/accept.png' height='40'/><div>"

				tempfilearray.push(data[i]);
				// console.log(tempfilearray);
        	};
			getUploadedfile(decoID,tempfilearray);
        },
        error: function(error)
        {
			console.log("error!!!!!!");
        }
   });
}
function getUploadedfile(decoID, tempfilearray) {
	// console.log("id: " + tempfilearray[0].id);
	$.ajax({
        url: originname + "/files/decoration/" + decoID,
        type: 'GET',
        success: function(data)
        {
        	for(var i = 0 ; i < data.length ; i++){
        		//$('.document-pdf').html("<p class='document-pdf col-md-1'>" + data[i].fileName + "<p>");
        		console.log("file name: " + data[i].fileName);
        		var uploadfilename = data[i].fileName;
        		for (var j = 0 ; j < tempfilearray.length ; j++){
        			if (uploadfilename === tempfilearray[j].fileName) {
        				console.log("upload file: " + data[i].fileName + "temp: " + tempfilearray[j].fileName);
        				$(".document-submit-" + tempfilearray[j].id).html("<button class='btn btn-primary' onclick='filereupload(" + decoID +"," + data[i].id + "," + tempfilearray[j].id +")'>更新</button>");
        				$(".document-pdf-" + tempfilearray[j].id).html("<a href='" + imagepath + data[i].url +"' download><img src='./img/pdf2.png' alt='download' height='40'/></a>");
        				//$(".document-accept-" + tempfilearray[j].id).html("<img src='./img/accepted.png' alt='accept' height='40'/>");
        			}
        		};        	
        	};
        },
        error: function(error)
        {
			console.log("error!!!!!!");
        }
   });
}
   
function fileupload(decoID, tempfileid) {
	var submitfile;
	var filename = $("#filename"+tempfileid).val();
	// console.log(filename +" , " +decoID);
	submitfile=$('#file_upload'+decoID+tempfileid).get(0).files[0];
	var fd = new FormData();    
		fd.append( 'fileName', filename );
		fd.append( 'file', submitfile );
	// console.log("submitfile: " + submitfile);
	// console.log(fd);
	$.ajax({
         type:'POST',
         url: originname+"/file/decoration/" + decoID,
         data:fd,
         cache:false,
         contentType: false,
         processData: false,
         success:function(data){
             console.log("update a file success");
             // console.log(data);
             alert(filename+"已上傳.");
             location.reload();
         },
         error: function(data){
             console.log("update a file failed");
             // console.log(data);
         }
    });
}
function filereupload(decoID, fileid, tempfileid) {
	var resubmitfile;
	var refilename = $("#filename"+tempfileid).val();
	console.log(refilename +" , " +decoID);
	resubmitfile=$('#file_upload'+decoID+tempfileid).get(0).files[0];
	var fd = new FormData();    
		fd.append( 'fileName', refilename );
		fd.append( 'file', resubmitfile );
	// console.log("rrrrrreeesubmitfile: " + refilename);
	// console.log(fd);
	$.ajax({
         type:'POST',
         url: originname+"/file/" + fileid +"/reupload" ,
         data:fd,
         cache:false,
         contentType: false,
         processData: false,
         success:function(data){
             console.log("reload a file success");
             // console.log(data);
             alert(refilename+"更新上傳.");
             location.reload();
         },
         error: function(data){
             console.log("reload a file failed");
             // console.log(data);
         }
    });
}
