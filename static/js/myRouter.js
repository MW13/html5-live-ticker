/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 16.05.13
 * Time: 21:46
 * To change this template use File | Settings | File Templates.
 */
App.Router.map(function() {
	this.route("index", { path: "/" });
	this.resource("matches", function() {
		this.resource("match", { path: ":match_id"}, function() {
			this.resource("addMatchEvent");
		});
		this.resource("addMatch");
	});
	this.resource("teams", function() {
		this.resource("team", { path: ":team_id"});
	});
	this.resource("playerList", function() {
		this.route("new");
		this.resource("player", { path: ":player_id"});
	});
	this.route("club");
	this.route("profile");
	this.route("login");
	this.route("register");
});

App.AuthRoute = Ember.Route.extend({
	redirect: function() {
		var controller = App.session;
		if(!controller.get("user")) {
			this.transitionTo("login");
		}
	}
});

App.IndexRoute = Ember.Route.extend({});

App.ApplicationRoute = Ember.Route.extend({
	setupController: function() {
		this.controllerFor("club").set("content", App.Club.find(101));
		this.controllerFor("teams").set("content", App.Team.find());
		this.controllerFor("playerList").set("content", App.Player.find());
	}
});

App.MatchesRoute = Ember.Route.extend({
	model: function() {
		return App.Match.find();
	}
});

App.PlayerListRoute = App.AuthRoute.extend({
	model: function() {
		//return this.controllerFor("playerList").get("content");
		return App.Player.find();
	}
});

App.ClubRoute = App.AuthRoute.extend({
	model: function() {
		//return this.controllerFor("club").get("content");
		return App.Club.find(101);
	}
});

App.TeamsRoute = App.AuthRoute.extend({
	model: function() {
		//return this.controllerFor("teams").get("content");
		return App.Team.find();
	}
});


App.AddMatchEventRoute = App.AuthRoute.extend({
	model: function(params) {
		return App.Match.find(params.match_id);
	}
});