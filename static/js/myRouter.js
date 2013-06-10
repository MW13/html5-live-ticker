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
	this.resource("club");
	this.route("profile");
	this.route("login");
	this.route("register");
	this.resource("test");
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
	model: function() {
		return App.Club.find("51af43fd1cf778493ccd0d3a");
	},
	setupController: function(controller, model) {
		this.controllerFor("club").set("content", model);
		var clubId = this.controllerFor("club").get("id");
		this.controllerFor("teams").set("content", App.Team.find());
		this.controllerFor("playerList").set("content", App.Player.find());
	}
});

App.TestRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor("application");
	}
});

App.MatchesRoute = Ember.Route.extend({
	model: function() {
		return App.Match.find();
	}
});

App.MatchRoute = Ember.Route.extend({
	model: function(params) {

	},
	setupController: function(controller) {
		var clubId = this.controllerFor("club").get("id");
		controller.set('matchEvents', App.MatchEvent.find());
	}
});

App.AddMatchEventRoute = App.AuthRoute.extend({
	model: function(params) {
		return App.Match.find(params.match_id);
	}
});

App.PlayerListRoute = App.AuthRoute.extend({
	model: function() {
		return App.Player.find();
	}
});

App.PlayerListNewRoute = App.AuthRoute.extend({
	/*model: function() {
		return App.Player.createRecord();
	}*/
});

App.TeamsRoute = App.AuthRoute.extend({
	model: function() {
		return App.Team.find();
	}
});


App.ClubRoute = App.AuthRoute.extend({
	model: function() {
		//return this.controllerFor("club").get("content");
		return this.modelFor("application");
	}
});