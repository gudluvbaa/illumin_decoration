var originname = "http://218.161.115.218:8080/HouseManager";
var imagepath = "http://218.161.115.218:80";

$(function() {
	//var adminurl = window.location.href;
	var adminurl = 'http://218.161.115.218/illuminDecoration/admin.html?decoid=515';
	var adminsplit = adminurl.split("?decoid=");
	var decoID = adminsplit[1];
	console.log("encode: " + decoID);
	getAppliedDeco(decoID)
});

var appliedTitle;
var appliedContent;
var appliedDesignerName;
var appliedDesignerPhone;
var appliedDesignerMail;
var appliedOverSeerName;
var appliedOverSeerPhone;
var appliedOverSeerMail;
var appliedstartFormat;
var appliedendFormat;
var appliedHeavyNoise;
var appliedCash;



function getAppliedDeco(decoID) {
	$("#admindecoAppliedDesignerName").html("");
	$("#admindecoAppliedDesignerMail").html("");
	$("#admindecoAppliedDesignerPhone").html("");
	$("#admindecoAppliedOverSeerName").html("");
	$("#admindecoAppliedOverSeerPhone").html("");
	$("#admindecoAppliedOverSeerMail").html("");
	$(".deco-cash-section-cash").html("");
	$.ajax({
        url: originname + "/decoration/" + decoID,
        type: 'GET',
        success: function(data)
        {
			console.log(data);
			console.log("success!!!!!!");
			$("#admindecoAppliedId").append(data.id);
			$("#admindecoAppliedName").html(data.houseFloor + " - " + data.houseNumber);
			$("#admindecoAppliedDesignerName").html(data.designer);
			$("#admindecoAppliedDesignerMail").html(data.designerPhone);
			$("#admindecoAppliedDesignerPhone").html(data.designerMail);
			$("#admindecoAppliedOverSeerName").html(data.overseer);
			$("#admindecoAppliedOverSeerPhone").html(data.overseerPhone);
			$("#admindecoAppliedOverSeerMail").html(data.overseerMail);
			$(".deco-cash-section-cash").html("<input id='decoCash" + decoID + "' class='form-control' type='number'> </input>");
			$(".deco-cash-section-btn").html("<button class='btn btn-default' onclick='addeposit(" + decoID + ")'>儲存</button>");
			
			
			getTempfileAdmin(decoID);
			//getUserUploadfile(decoID);
			
			appliedTitle = data.title;
			appliedContent = data.content;
			appliedDesignerName = data.designer;
			appliedDesignerPhone = data.designerPhone;
			appliedDesignerMail = data.designerMail;
			appliedOverSeerName = data.overseer;
			appliedOverSeerPhone = data.overseerPhone;
			appliedOverSeerMail = data.overseerMail;
			appliedstartFormat = data.startFormat;
			appliedendFormat = data.endFormat;
			appliedHeavyNoise = data.heavyNoise;
			appliedCash = data.cash;

        },
        error: function(error)
        {
			console.log("error!!!!!!");
        }
   });
}
function getTempfileAdmin(decoID){
	var tempfilearray = [];
	$.ajax({
        url: originname + "/files/building/1",
        type: 'GET',
        success: function(data)
        {
        	for(var i = 0 ; i < data.length ; i++){
				$(".applied-deco-section").append("<div class='deco-apply-file-list col-md-12'><div class='document-title col-md-5'><h4>"+ data[i].fileName +"</h4></div>" +
				"<div class='document-fileName col-md-2' display='block'><input class='form-control' type='text' id='filename" + data[i].id + "' value='" + data[i].fileName + "'></input></div>" +
				"<div class='document-pdf-" + data[i].id + " col-md-1'><img src='img/pdf1.png' height='40'/></div>" + 
				"<div class='document-accept-" + data[i].id + " col-md-1'><input type='image' src='img/accept.png' height='40'></input></div></div>");
        		
				tempfilearray.push(data[i]);
				console.log(tempfilearray);
        	};
			getUploadedfileAdmin(decoID,tempfilearray);
        },
        error: function(error)
        {
			console.log("error!!!!!!");
        }
   });
}

function getUploadedfileAdmin(decoID, tempfilearray) {
	console.log("id: " + tempfilearray[0].id);
	$.ajax({
        url: originname + "/files/decoration/" + decoID,
        type: 'GET',
        success: function(data)
        {
        	for(var i = 0 ; i < data.length ; i++){
        		console.log("file name: " + data[i].fileName);
        		var uploadfilename = data[i].fileName;
        		for (var j = 0 ; j < tempfilearray.length ; j++){
        			if (uploadfilename === tempfilearray[j].fileName) {
        				//console.log("upload file: " + data[i].fileName + "temp: " + tempfilearray[j].fileName);
        				//$(".document-submit-" + tempfilearray[j].id).html("<button class='btn btn-primary' onclick='filereupload(" + decoID +"," + data[i].id + "," + tempfilearray[j].id +")'>上傳</button>");
        				$(".document-pdf-" + tempfilearray[j].id).html("<a href='" + imagepath + data[i].url +"' download><img src='./img/pdf2.png' alt='download' height='40'></a>");
        				
        				if (data[i].accepted == true ) {
        					$(".document-accept-" + tempfilearray[j].id).html("<input type='image' src='img/accepted.png' height='40' onclick='modifyFileAccept(" + data[i].id + ")'></input>");
        				} else {
        					$(".document-accept-" + tempfilearray[j].id).html("<input type='image' src='img/accept.png' height='40' onclick='modifyFileAccept(" + data[i].id + ")'></input>");
        				}
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

function modifyFileAccept(fileid) {
	console.log("file id : " + fileid);
	$.ajax({
        url: originname + "/file/" + fileid + "/accept",
        type: 'PUT',
        success: function(data)
        {
        	alert("資料已通過");
            location.reload();
        },
        error: function(error)
        {
			console.log("error!!!!!!");
        }
   });
}
function addeposit(decoid) {
	console.log("id:::::::: " + decoid);
	appliedCash = $('#decoCash'+ decoid).val();
	
	var dfd = new FormData();    
		dfd.append( 'title', appliedTitle );
		dfd.append( 'content', appliedContent );
		dfd.append( 'designer', appliedDesignerName );
		dfd.append( 'designerPhone', appliedDesignerPhone );
		dfd.append( 'designerMail', appliedDesignerMail );
		dfd.append( 'overseer', appliedOverSeerName );
		dfd.append( 'overseerPhone', appliedOverSeerPhone );
		dfd.append( 'overseerMail', appliedOverSeerMail );
		dfd.append( 'startFormat', appliedstartFormat );
		dfd.append( 'endFormat', appliedendFormat );
		dfd.append( 'heavyNoise', appliedHeavyNoise );
		dfd.append( 'cash', appliedCash );
		
	console.log(appliedCash);	
	console.log(appliedendFormat);
	
	/*$.ajax({
         type:'POST',
         url: originname+"decoration/{decorationid}" + decoID,
         data:dfd,
         cache:false,
         contentType: false,
         processData: false,
         success:function(data){
             console.log("update a file success");
             console.log(data);
             alert(filename+"已上傳.");
             location.reload();
         },
         error: function(data){
             console.log("update a file failed");
             console.log(data);
         }
    });*/
	
}
