/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 26.04.13
 * Time: 15:34
 * To change this template use File | Settings | File Templates.
 */
window.App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	VERSION: '1.0.0',
	ready: function () {
		console.log('App version: ' + App.VERSION + ' is ready.');
	}
});

// var socket = io.connect();
/*
 socket.on('server_message', function(data){
 alert(data);
 });


 socket.on("loginResponse", function(data) {
 this.transitionToRoute("index");
 });*/