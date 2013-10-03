var serviceURL = "http://www.hamptons.com/m/php/";

var homelist;

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function showDateNav(){
	$('#datenav').html('<a class="datenav" href="index.html" rel="external">TODAY</a> &#183; <a class="datenav" href="index.html?mode=thisweek" rel="external">THIS WEEK</a> &#183; <a class="datenav" href="index.html?mode=thismonth" rel="external">THIS MONTH</a>');
}

function showEventList(mode) {

	weekday=new Array();
	weekday[0]="Sunday";
	weekday[1]="Monday";
	weekday[2]="Tuesday";
	weekday[3]="Wednesday";
	weekday[4]="Thursday";
	weekday[5]="Friday";
	weekday[6]="Saturday";

	$.getJSON(serviceURL + 'getevents.php?mode='+mode, function(data){
		events = data.items;
		var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		$.each(events, function(index, curevent) {
			curdate=curevent.eventDate;
			arrCurdate=curdate.split(/-/);
			var curdate = new Date(arrCurdate[0],arrCurdate[1]-1,arrCurdate[2]);
			var curdatename = weekday[curdate.getDay()] + ', ' + (monthNames[curdate.getMonth()]) + ' ' + curdate.getDate() + ', ' +  curdate.getFullYear();
			timeStart="";
			timeEnd="";
			time="<p>";
			if(curevent.timeStart!='00:00:00'){
				curTimeStart=curevent.timeStart;
				if(curTimeStart){
					var arrCurTimeStart = new Array();
					arrCurTimeStart=curTimeStart.split(/[:]/);
					hour=parseInt(arrCurTimeStart[0],10);
					if(hour>12){
						hour=hour-12;
					}
					minute=arrCurTimeStart[1];
					if(arrCurTimeStart[0]>=12){
						ampm='pm';
					} else {
						ampm='am';
					}
					time=time + 'Time: ' + hour + ':' + minute + ampm;
				}
			}
			if(curevent.timeEnd!='00:00:00'){
				curTimeEnd=curevent.timeEnd;
				if(curTimeEnd){
					var arrCurTimeEnd = new Array();
					arrCurTimeEnd=curTimeEnd.split(/[:]/);
					hour=parseInt(arrCurTimeEnd[0],10);
					if(hour>12){
						hour=hour-12;
					}
					minute=arrCurTimeEnd[1];
					if(arrCurTimeEnd[0]>12){
						ampm='pm';
					} else {
						ampm='am';
					}
					time=time + ' - ' + hour + ':' + minute + ampm;
				}
			}
			time=time+'</p>';
			$('#eventList').append('<li data-theme="a"><a href="event.html?eventID=' + curevent.eventID + '">' +
					'<h4>' + curevent.title + '</h4>' +
					'<p>' + curdatename + '</p>' +
					time +
					'</a></li>');
		});
		$('#eventList').listview('refresh');
		$('#eventList').fadeIn('slow');
		
	});
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


$(document).on('pageshow', '#eventListPage', function(event) {

	var mode=getParameterByName('mode');
	showDateNav();
	showEventList(mode);
	
});


