/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 16.04.13
 * Time: 18:17
 * To change this template use File | Settings | File Templates.
 */
App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.store = DS.Store.create({
	adapter: "DS.RESTAdapter",
	revision: 12
});


/*
 App.ClickableView = Ember.View.extend({
 click: function(evt) {
 alert("ClickableView was clicked!");
 this.get('controller').send('turnItUp', 11);
 }
 });

 App.PlaybackController = Ember.ObjectController.extend({
 turnItUp: function(level){
 alert("PlaybackController");
 }
 });

 App.PlaybackRoute = Ember.Route.extend({
 events: {
 turnItUp: function(level){
 //This won't be called if it's defined on App.PlaybackController
 alert("PlaybackRoute");
 }
 }
 });

 var view = Ember.View.create({
 templateName: 'info',
 name: "Bob"
 });

 // Define parent view
 App.UserView = Ember.View.extend({
 templateName: 'user',

 firstName: "Albert",
 lastName: "Hofmann"
 });

 // Define child view
 App.InfoView = Ember.View.extend({
 templateName: 'info',

 posts: 25,
 hobbies: "Riding bicycles"
 });
 */