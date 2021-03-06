/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 16.05.13
 * Time: 21:46
 * To change this template use File | Settings | File Templates.
 */
const CLUB_ID = "51e6995676b718a9bddb4c25";

App.Router.map(function () {
	this.route("index", { path: "/" });
	this.resource("matches", function () {
		this.resource("match", { path: ":match_id"}, function () {
			this.resource("addMatchEvent");
		});
		this.resource("addMatch");
	});
	this.resource("teams", function () {
		this.resource("team", { path: ":team_id"});
	});
	this.resource("players", function () {
		this.resource("player", { path: ":player_id"});
		this.route("new");
	});
	this.resource("club");
	this.route("profile");
	this.route("login");
	this.route("register");
});

App.AuthRoute = Ember.Route.extend({
	redirect: function () {
		var controller = App.session;
		if (!controller.get("user")) {
			this.transitionTo("login");
		}
	}
});

App.IndexRoute = Ember.Route.extend({});

App.ApplicationRoute = Ember.Route.extend({
	model: function () {
		return App.Club.find(CLUB_ID);
	},
	setupController: function (controller, model) {
		this.controllerFor("club").set("content", model);
	}
});

App.MatchesRoute = Ember.Route.extend({
	model: function () {
		return App.Match.find();
	}
});

App.AddMatchRoute = Ember.Route.extend({
	setupController: function () {
		this.controllerFor("teams").set("model", App.Team.find());
	}
});

App.MatchRoute = Ember.Route.extend({
	model: function (params) {
		return App.Match.find(params.match_id);
	},
	setupController: function (controller, model) {
		this.controllerFor("match").set("model", model);
		controller.set('matchEvents', App.MatchEvent.find({"match_id": model.get("id")}));
	}
});

App.AddMatchEventRoute = App.AuthRoute.extend({
	model: function () {
		return this.modelFor("match");
	},
	setupController: function (controller, model) {
		controller.set("model", model);
		this.controllerFor("teams").set("model", App.Team.find());
		this.controllerFor("players").set("model", App.Player.find());
	},
	renderTemplate: function(controller){
		this.render('addMatchEvent', {
			into: 'application',
			controller: 'addMatchEvent' });
	}
});

App.PlayersRoute = App.AuthRoute.extend({
	model: function () {
		return App.Player.find();
	}
});

App.TeamsRoute = App.AuthRoute.extend({
	model: function () {
		return App.Team.find();
	},
	setupController: function (controller, model) {
		this.controllerFor("teams").set("model", model);
		this.controllerFor("players").set("model", App.Player.find());
	}
});

App.ClubRoute = App.AuthRoute.extend({
	model: function () {
		return App.Club.find(CLUB_ID);
	}
});

App.ProfileRoute = App.AuthRoute.extend({
});