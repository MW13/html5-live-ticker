/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 08.05.13
 * Time: 12:28
 * To change this template use File | Settings | File Templates.
 */
function weekday(kickoff) {
	var day = kickoff.getDay();
	switch(day) {
		case 0: return "So";
		case 1: return "Mo";
		case 2: return "Di";
		case 3: return "Mi";
		case 4: return "Do";
		case 5: return "Fr";
		default: return "Sa";
	}
}
function extractYear(kickoff) {
	return 1900 + ((1900 + kickoff.getYear()) % 1900);
}
function month(kickoff) {
	var month = kickoff.getMonth();
	switch(month) {
		case 0: return "01";
		case 1: return "02";
		case 2: return "03";
		case 3: return "04";
		case 4: return "05";
		case 5: return "06";
		case 6: return "07";
		case 7: return "08";
		case 8: return "09";
		default: return month++;
	}
}
function date(d) {
	return weekday(d) + ", " + d.getDate() + "." + month(d) + "." + extractYear(d);
}
function time(d) {
	var hours = d.getHours();
	var minutes = d.getMinutes();
	if(d.getHours() <= 9) {
		hours = "0" + hours;
	}
	if(d.getMinutes() <= 9) {
		minutes = "0" + minutes;
	}
	return hours + ":" + minutes + " Uhr";
}

function age(date) {
	var today = new Date();
	var bday = new Date(date);

	var day = today.getDate()-bday.getDate();
	var months = today.getMonth()-bday.getMonth();
	var years = today.getYear()-bday.getYear();

	if(day<0){day = 30+day; months--;}
	if(months<0){months = 12+months; years--;}
	if(years > 2000){years = years-2000}
	if(years > 1900){years = years-1900}
	console.log("Alter: " + day + " Tage; " + months + " Monate; " + years + " Jahre");
	return years;
}

function isValidTime(date) {
	var today = new Date();
	if (!isNaN(date.getTime()) && today.getTime() < date.getTime()) {
		return true;
	}
	alert("Der Termin ist fehlerhaft!");
	return false;
}

function isValidBday(date) {
	var today = new Date();
	if (!isNaN(date.getTime()) && today.getTime() > date.getTime()) {
		return true;
	}
	alert("Der Geburtstag ist fehlerhaft!");
	return false;
}

function isValidText(value) {
	var reg = /[a-zA-ZüÜöÖäÄ]+/;
	if (reg.test(value)) {
		return true;
	}
	alert("Der Text entspricht nicht dem Erlaubten!");
	return false;
}

function allowDrop(ev) {
	ev.preventDefault();
}

function drop(ev) {
	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");
	console.log(data);
	console.log(ev.target.tagName);
	if (ev.target.tagName == "DIV") {
		ev.target.firstElementChild.appendChild(document.getElementById(data));
	} else if (ev.target.tagName == "LI") {
		ev.target.parentElement.appendChild(document.getElementById(data));
	}

}

function drag(ev) {
	ev.dataTransfer.setData("Text",ev.target.id);
}

