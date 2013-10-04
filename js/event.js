$(document).on('pageshow', '#eventPage', function(event) {
	var eventID = getUrlVars()['eventID'];
	showEvent(eventID);
});

function showEvent(eventID) {
	
	//var eventID = getUrlVars()['eventID'];
	
	//var eventID = '26125';
	cururl=serviceURL + 'getevent.php?eventID='+eventID;
	//alert('cururl=' + cururl);
	$.getJSON(cururl, function(data){
		$('#actionlist li').remove();
		events = data.items;
		var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		$.each(events, function(index, curevent) {
			//alert('title=' + curevent.title);
			var curdate = new Date(curevent.eventDate);
			var curdate = (monthNames[curdate.getMonth()]) + ' ' + curdate.getDate() + ', ' +  curdate.getFullYear();
			
			var contactInfo = getContactInfo(curevent.contactName, curevent.contactPhone, curevent.contactEmail);
			var priceInfo = getPriceInfo(curevent.price);
			var whereInfo = getWhereInfo(curevent.location, curevent.addrStreet1, curevent.addrCity, curevent.addrZip);
			var websiteInfo = getWebsiteInfo(curevent.link);
			
			$('#title').text(curevent.title);
			$('#eventDate').text(curevent.curdate);
			$('#description').text(curevent.description);
			$('#contactInfo').html(contactInfo);
			$('#price').html(priceInfo);
			$('#where').html(whereInfo);
			$('#website').html(websiteInfo);
			
			//$('#actionlist').append('<li data-theme="a">something</li>');
		})
		$('#actionlist').listview('refresh');
		$('#actionlist').fadeIn('slow');
		
	});
}

function getContactInfo(contactName, contactPhone, contactEmail){
	str="";
	if (contactName){
		str=str + contactName + "<br>";
	}
	if (contactPhone){
		str=str + contactPhone + "<br>";
	}
	if (contactEmail){
		str=str + contactEmail + "<br>";
	}
	if (str){
		str="<strong>Contact Information</strong><br>" + str;	
	}
	return str;
}
function getPriceInfo(price){
	str="";
	if (price){
		str=str + price + "<br>";
	}
	if (str){
		str="<strong>Price</strong><br>" + str;	
	}
	return str;
}
function getWhereInfo(location, addrStreet1, addrCity, addrZip){
	str="";
	if (location){
		str=str + location + "<br>";
	}
	if (addrStreet1){
		str=str + addrStreet1 + "<br>";
	}
	if (addrCity){
		str=str + addrCity + "<br>";
	}
	if (addrZip){
		str=str + addrZip + "<br>";
	}
	if (str){
		str="<strong>Where</strong><br>" + str;	
	}
	return str;
}
function getWebsiteInfo(link){
	str="";
	if (link.length > 0){
		str=str + "<a href='http://" + link + "' target='_blank'>" + link + "</a><br>";
	}
	if (str.length > 0){
		str="<strong>Website</strong><br>" + str;	
	}
	return str;
}
