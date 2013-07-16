/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 23.04.13
 * Time: 19:21
 * To change this template use File | Settings | File Templates.
 */
App.Router.map(function () {
	this.resource("matchOverview", { path: "/matchOverview" }, function () {
		this.resource("start", {path: "/start"}, function () {
			this.route("finished", {path: "/finished"});
			this.route("live", {path: "/live"});
		});
		this.route("newMatch", {path: "/newMatch"});
	});
});

App.ApplicationRoute = Ember.Route.extend({
});

/*
 App.ApplicationController = Ember.Controller.extend({
 init: function() {
 this.set("name", localStorage.appName);
 },
 saveName: function(value) {
 localStorage.appName = value;
 }
 });
 */

App.IndexRoute = Ember.Route.extend({
	renderTemplate: function () {
		this.render({outlet: 'applicationOutlet'});
	}
});

App.MatchOverviewRoute = Ember.Route.extend({
	/*setupController: function(controller) {
	 //this.controllerFor("application").set("title", "Live-Ticker");
	 controller.set("title", "Live-Ticker");
	 },*/
	renderTemplate: function () {
		this.render({outlet: 'applicationOutlet'});
	}
});
App.MatchOverviewController = Ember.Route.extend({
	openNewMatch: function () {
		//this.transitionToRoute("matchOverview.newMatch");
	}
});

App.StartIndexRoute = Ember.Route.extend({
	renderTemplate: function () {
		this.render({outlet: 'applicationOutlet'});
		this.render("startLive", {
			into: "start",
			outlet: "applicationOutlet",
			controller: "startLive"
		})
	}
});
App.StartController = Ember.Route.extend({
});

App.StartFinishedRoute = Ember.Route.extend({
	renderTemplate: function () {
		this.render({outlet: "tabsOutlet"});
	}
});
App.StartLiveRoute = Ember.Route.extend({
	renderTemplate: function () {
		this.render({outlet: "tabsOutlet"});
	}
});

App.MatchOverviewNewMatchRoute = Ember.Route.extend({
	setupController: function (controller) {
		controller.set("title", "Neues Spiel");
	},
	renderTemplate: function () {
		this.render({outlet: 'applicationOutlet'});
	}
});