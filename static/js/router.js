/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 08.05.13
 * Time: 13:13
 * To change this template use File | Settings | File Templates.
 */

App.Router.map(function () {
	this.route("index", { path: "/" });
	this.route("login");
	this.route("register");
	this.resource("matchOverview", function () {
		this.route("index", { path: "/" });
		this.route("finished");
		this.route("live");
		this.route("coming");
	});
	this.route("newMatch");
	this.route("account");
	this.route("playerPool");
	this.route("newPlayer");
	this.route("editPlayer");
	this.resource("teams", function () {
		this.route("index", { path: "/" });
		this.route("managePlayers");
		this.route("manageModerators");
	});
	this.route("club");
	this.route("newTeam");
	this.route("editClub");
});

App.Router.reopen({
	//location: "history"
});

App.IndexRoute = Ember.Route.extend({
	setupController: function (controller) {
		this.controllerFor("club").set("content", App.Club.find({name: "1. SV Oberkrämer"}));
		/*App.Club.find({name: "1. SV Oberkrämer"}).then(function(res) {
		 //console.log(res.get("content").objectAt(0).record._data.attributes.name);
		 console.log("RESPONSE: " + res);

		 });*/
		/*
		 var store = DS.get("defaultStore");
		 var adapter = store.adapterForType(App.Club);
		 //load(@get('store'), App.Club, sessionJson['user_session']);
		 App.Club.find().then(function(res) {
		 console.log(res.get("content").get("length"));
		 this.controllerFor("club").set("content", club);
		 });*/
		//console.log(club.objectAt(0));
	}
	/*var club = App.Club.find({name: "Testclub"});
	 console.log(club + " - " + club.name);
	 this.controller.set("content", club);
	 //App.ClubController.loadClub();
	 }*/
});

App.MatchOverviewRoute = Ember.Route.extend({
	model: function () {
		var matches = App.Match.find();
		console.log(matches.get("length"));
		return matches;
	},
	setupController: function (controller, model) {
		//this.controller.set("content", []);
		//App.MatchesController.loadMatches();
		controller.set("content", model);
	}
});

App.matchOverviewController = Ember.ArrayController.create({
	matches: function () {

	}
});

App.MatchOverviewIndexRoute = Ember.Route.extend({
	redirect: function () {
		//App.MatchesController.loadMatches();
		this.transitionTo("matchOverview.live");
	}
});

App.MatchOverviewLiveRoute = Ember.Route.extend({
	setupController: function () {
		var content = App.MatchesController.get("content");
		//var content = App.Match.find();
		var liveMatches = content.filter(function (item) {
			return item.get("state") == "live";
		});
		this.controller.set("content", liveMatches);
		App.MatchesController.loadMatches();
	}
});

App.MatchOverviewFinishedRoute = Ember.Route.extend({
	setupController: function () {
		var content = App.MatchesController.get("content");
		var finishedMatches = content.filter(function (item) {
			return item.get("state") == "finished";
		});
		console.log("finishedMatches: " + finishedMatches);
		this.controller.set("content", finishedMatches);
		App.MatchesController.loadMatches();
	}
});

App.MatchOverviewComingRoute = Ember.Route.extend({
	setupController: function () {
		var content = App.MatchesController.get("content");
		var comingMatches = content.filter(function (item) {
			return item.get("state") == "coming";
		});
		console.log("comingMatches: " + comingMatches);
		this.controller.set("content", comingMatches);
		App.MatchesController.loadMatches();
	}
});

App.RegisterRoute = Ember.Route.extend({
	init: function () {
		//socket.emit('message', 'Message Sent on ' + new Date());
	}
});

App.ClubRoute = Ember.Route.extend({
	model: function () {
		return App.Club.find({name: "1. SV Oberkrämer"});
	}
});


/* /myRouter/
 App.ClubsRoute = Ember.Route.extend({
 model: function() {
 return App.Club.find();
 },
 setupController: function() {
 //this.controllerFor("clubs").set("selectedClub", null);
 this.controllerFor("matches").set("content", null);
 }
 });*/
/*
 App.ClubRoute = Ember.Route.extend({
 setupController: function(model) {

 //this.controllerFor("teams").set("content", App.Team.find({club: model.get("id")}));
 },
 renderTemplate: function() {
 this.render('club', {
 into: "application",
 controller: this
 });
 }
 });
 */