/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 08.05.13
 * Time: 13:07
 * To change this template use File | Settings | File Templates.
 */

App.ClubController = Ember.ObjectController.extend({
	/*loadClub: function(userId) {
		//App.Club.find();
		//var club = App.Club.createRecord({name: "1.SVO"});
		var res = App.Club.find();
		console.log(res.objectAt(0));
		this.set("content", res.objectAt(0));
		//socket.emit("loadClub", userId);

		var self = this;
		$.getJSON("data/clubs.json", function(data) {
			var club = App.Club.createRecord({
				name: data.name
			});
			self.set("content", club);
		})
	}*/
});

App.MatchesController = Ember.ArrayController.create({
	content: [],
	loadMatches: function() {
		/*
		var self = this;
		//console.log(self.content);
		$.getJSON("data/matches.json", function(data) {
			//$.getJSON(url, function(data) {
			self.set("content", []);
			$(data).each(function(index, value) {
				console.log("TeamId: " + value);
				var match = App.Match.createRecord(data);

				self.pushObject(match);
			});
		});*/
	},
	addMatch: function(match) {

	}
});

App.IndexController = Ember.ObjectController.extend({
	needs: ["club"],
	btnClass: "menu-button",
	isModerator: function() {
		return userManager.get("currentState.name") == "loggedIn";
	}.property(),
	isAdministrator: function() {
		//return this.get("isModerator") && true;
		return true;
	}.property("isModerator")/*,
	test: function() {
		console.log(this.get("controllers.club").get("content"));
		return "Name";
	}.property()*/
});

App.MatchOverviewController = Ember.ObjectController.extend({
	title: "Spielübersicht",
	amountMatches: function() {
		//var length = this.get("content").toArray().get("length");
		return length || 0;
	}.property("@each")
});

App.MatchOverviewLiveController = Ember.ArrayController.extend({
	matches: function(){
		return this.content;
	}.property("content")
});

App.MatchOverviewFinishedController = Ember.ArrayController.extend({
	matches: function(){
		return this.content;
	}.property("content")
});

App.MatchOverviewComingController = Ember.ArrayController.extend({
	matches: function(){
		return this.content;
	}.property("content")
});

App.MatchController = Ember.ObjectController.extend({
	needs: ["index"],
	teamHome: function() {
		if(this.get("content.homeAdvantage")) {
			return App.Club.find(1).get("name");
		} else {
			return this.get("content.opponent");
		}
	}.property("homeAdvantage", "opponent"),
	teamAway: function() {
		if(this.get("content.homeAdvantage")) {
			return this.get("content.opponent");
		} else {
			return App.Club.find(1).get("name");
		}
	}.property("homeAdvantage", "opponent"),
	goalsHome: function() {
		if(this.get("content.homeAdvantage")) {
			return this.get("content.ownGoals");
		} else {
			return this.get("content.opponentGoals");
		}
	}.property("homeAdvantage", "ownGoals", "opponentGoals"),
	goalsAway: function() {
		if(this.get("content.homeAdvantage")) {
			return this.get("content.opponentGoals");
		} else {
			return this.get("content.ownGoals");
		}
	}.property("homeAdvantage", "ownGoals", "opponentGoals"),
	time: function() {
		var kickoff = new Date();
		kickoff.setTime(this.get("content.kickoff"));
		return time(kickoff);
	}.property("kickoff"),
	date: function() {
		var kickoff = new Date();
		kickoff.setTime(this.get("content.kickoff"));
		return date(kickoff);
	}.property("kickoff"),
	team: function() {
		var team = this.get("content.team");
		var name = team.get("name");
		console.log(team + " - " + name);
		return name;
	}.property("team")
});

App.ModeratorController = Ember.ObjectController.create({

});

App.LoginController = Ember.ObjectController.extend({
	login: function(moderator) {
		ws.emit('loginRequest', moderator);
	},
	goToIndex: function() {
		this.transitionToRoute("index");
	}
});

App.RegisterController = Ember.ObjectController.extend({
	register: function(moderator) {
		ws.emit('register', moderator);
	}
});