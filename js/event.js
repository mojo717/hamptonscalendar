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
			$('#title').text(curevent.title);
			$('#eventDate').text(curevent.curdate);
			$('#description').text(curevent.description);
			
			$('#actionlist').append('<li data-theme="a">something</li>');
		})
		$('#actionlist').listview('refresh');
		$('#actionlist').fadeIn('slow');
		
	});
}

