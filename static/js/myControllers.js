/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 16.05.13
 * Time: 21:50
 * To change this template use File | Settings | File Templates.
 */
App.ApplicationController = Ember.Controller.extend({
	needs: ["club"],
	logout: function() {
		this.transitionToRoute("index");
		App.session.set("user", null);
		localStorage.userId = null;
		localStorage.firstName = null;
		localStorage.lastName = null;
		localStorage.email = null;
		localStorage.role = null;
	},
	init: function() {
		App.session.set("user", {
			id: localStorage.userId,
			firstName: localStorage.firstName,
			lastName: localStorage.lastName,
			email: localStorage.email,
			role: localStorage.role
		});
	}
});

App.TeamsController = Ember.ArrayController.extend({
	/*needs: ["club"],
	clubBinding: "controllers.club",
	clubTeams: function() {
		var club = this.get("controllers.club");
		var teams = this.filter(function(team) {
			return team.get("club").get("id") == club.get("id");
		});
		return teams;
	}.property("@each")*/
	needs: ["club", "teams", "playerList"],
	clubBinding: "controllers.club",
	clubPlayerList: function() {
		var club = this.get("controllers.club");
		var teamPlayerList = this.get("teamPlayerList");
		var playerList = this.get("controllers.playerList").filter(function(player) {
			return (!teamPlayerList.contains(player) && player.get("club").get("id") == club.get("id"));
		});
		return playerList;
	}.property("@each", "teamPlayerList"),
	selectedTeamId: null,
	selectedTeamName: function() {
		return App.Team.find(this.get("selectedTeamId")).get("name");
	}.property("selectedTeamId"),
	teamPlayerList: function() {
		console.log("calculate teamPlayerList");
		var clubPlayerList = this.get("controllers.playerList");
		var selectedTeamId = this.get("selectedTeamId");
		var playerList = [];
		clubPlayerList.forEach(function(player) {
			var teams = player.get("teams");
			teams.forEach(function(team) {
				if (team.get("id") == selectedTeamId) {
					playerList.pushObject(player);
				}
			});
		});
		return playerList;
	}.property("@each", "selectedTeamId", "clubPlayerList"),
	valueChanged: function(value) {
		this.set("selectedTeamId", value);
	}
});

App.PlayerListController = Ember.ArrayController.extend({
	needs: ["club", "playerList"],
	clubPlayerList: function() {
		var club = this.get("controllers.club");
		var playerList = this.get("controllers.playerList").filter(function(player) {
			return player.get("club").get("id") == club.get("id");
		});
		return playerList;
	}.property("@each"),
	delete: function(player) {
		alert("delete " + player);
		player.deleteRecord();
	},
	edit: function(player) {
		alert("edit");
		this.transitionToRoute("player", player);
	}
});

App.PlayerListNewController = Ember.ObjectController.extend({
	needs: ["club"],
	firstName: "",
	lastName: "",
	birthday: "",
	createPlayer: function() {
		var firstName = this.get("firstName");
		var lastName = this.get("lastName");
		var bday = new Date(this.get("birthday"));
		console.log("bday: " + bday + " - " + this.get("birthday"));
		if (isValidText(firstName) && isValidText(lastName) && isValidBday(bday)) {
			var clubId = this.get("controllers.club.id");
			var player = Ember.Object.create({
				firstName: firstName,
				lastName: lastName,
				birthday: bday,
				club: App.Club.find(clubId)
			});
			App.Player.createRecord(player);
			this.set("firstName", "");
			this.set("lastName", "");
			this.set("birthday", "");
		}
	}
});

App.article = Ember.Object.create({
	content: ["der", "die", "das"],
	selectedArticle: null
});

App.TeamController = Ember.ObjectController.extend({});

App.ClubController = Ember.ObjectController.extend({
});

App.session = Ember.Object.create({
	user: null
});

App.MatchesController = Ember.ArrayController.extend({
	needs: ["club"],
	clubBinding: 'controllers.club',
	finishedMatches: function() {
		var matches = this.filter(function(match) {
			return match.get('state') == "finished";
		});
		return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
			sortProperties: ['kickoff'],
			sortAscending: false,
			content: matches
		});
	}.property('@each.state', '@each.kickoff'),
	liveMatches: function() {
		var matches = this.filter(function(match) {
			return match.get('state') == "live";
		});
		return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
			sortProperties: ['kickoff'],
			sortAscending: false,
			content: matches
		});
	}.property('@each.state', '@each.kickoff'),
	comingMatches: function() {
		var matches = this.filter(function(match) {
			return match.get('state') == "coming";
		});
		return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
			sortProperties: ['kickoff'],
			sortAscending: true,
			content: matches
		});
	}.property('@each.state', '@each.kickoff')
});

App.MatchOverviewController = Ember.ObjectController.extend({
	needs: ["club"],
	teamHome: function() {
		if(this.get("content.homeAdvantage")) {
			return this.get("controllers.club.content.name");
		} else {
			return this.get("content.opponent");
		}
	}.property("content.homeAdvantage", "content.opponent"),
	teamAway: function() {
		if(this.get("content.homeAdvantage")) {
			return this.get("content.opponent");
		} else {
			return this.get("controllers.club.content.name");
		}
	}.property("content.homeAdvantage", "content.opponent"),
	goalsHome: function() {
		if(this.get("content.homeAdvantage")) {
			return this.get("content.ownGoals");
		} else {
			return this.get("content.opponentGoals");
		}
	}.property("content.homeAdvantage", "content.ownGoals", "content.opponentGoals"),
	goalsAway: function() {
		if(this.get("content.homeAdvantage")) {
			return this.get("content.opponentGoals");
		} else {
			return this.get("content.ownGoals");
		}
	}.property("content.homeAdvantage", "content.ownGoals", "content.opponentGoals"),
	time: function() {
		var kickoff = new Date();
		kickoff.setTime(this.get("content.kickoff"));
		return time(kickoff);
	}.property("content.kickoff"),
	date: function() {
		var kickoff = new Date();
		kickoff.setTime(this.get("content.kickoff"));
		return date(kickoff);
	}.property("content.kickoff"),
	teamGroup: function() {
		var team = this.get("content.team");
		var name = team.get("name");
		return name;
	}.property("content.team")
});

App.matchEventTypes = Ember.Object.create({
	selected: "",
	content: ["Tor", "Torabschluss", "Karte", "Auswechslung", "Halbzeit"],
	goal: false,
	scoringOpportunity: false,
	cart: false,
	substitution: false,
	halftime: false
});

App.matchEvent = Ember.Object.create({
	title: "",
	text: "",
	club: "",
	type: ""
});

App.creations = Ember.Object.create({
	content: [{id: "dribbling", name: "Dribbling", type: "solo"},
				{id: "easy_goal", name: "Abstauber", type: "solo"},
				{id: "corner", name: "Eckstoß", type: "solo"},
				{id: "penalty", name: "Elfmeter", type: "solo"},
				{id: "long_shot", name: "Fernschuss", type: "solo"},
				{id: "free_kick", name: "Freistoß", type: "solo"},
				{id: "lob", name: "Lupfer", type: "solo"},
				{id: "double_pass", name: "Doppelpass", type: "assist"},
				{id: "corner_cross", name: "Eckstoß", type: "assist"},
				{id: "cross_high", name: "Flanke (hoch)", type: "assist"},
				{id: "cross_low", name: "Flanke (flach)", type: "assist"},
				{id: "free_kick_short", name: "Freistoß (Ablage)", type: "assist"},
				{id: "free_kick_cross", name: "Freistoß (Flanke)", type: "assist"},
				{id: "cross_kick", name: "Querpass", type: "assist"}]
});

App.bodyParts = Ember.Object.create({
	content: [{id: "head", name: "Kopf", types: ["easy_goal", "lob", "corner_cross", "cross_high", "free_kick_cross"]},
				{id: "foot_left", name: "Fuß (links)", types: ["dribbling", "easy_goal", "corner", "penalty", "long_shot", "free_kick", "lob", "double_pass", "corner_cross", "cross_high", "cross_low", "free_kick_short", "free_kick_cross", "cross_kick"]},
				{id: "foot_right", name: "Fuß (rechts)", types: ["dribbling", "easy_goal", "corner", "penalty", "long_shot", "free_kick", "lob", "double_pass", "corner_cross", "cross_high", "cross_low", "free_kick_short", "free_kick_cross", "cross_kick"]},
				{id: "heel", name: "Hacke", types: ["easy_goal", "double_pass", "corner_cross", "cross_high", "cross_low", "free_kick_cross", "cross_kick"]},
				{id: "knee", name: "Knie", types: ["easy_goal", "double_pass", "corner_cross", "cross_high", "free_kick_cross", "cross_kick"]}]
});

App.goal = Ember.Object.create({
	scorer: "",
	scorerNr: 0,
	fieldPosition: "",
	goalSegment: "",
	partOfBody: "",
	creation: ""
});

App.assist = Ember.Object.create({
	fieldPosition: "",
	assist: "",
	assistNr: 0
});
/*
App.match = Ember.Object.create({
	homeAdvantage: false,
	opponent: "",
	date: "",
	time: "",
	place: "",
	teamId: 0,
	minute: 0
});
*/
App.MatchController = Ember.ObjectController.extend({
	timer: null,
	notStarted: function() {
		console.log(this.get("state") == "coming");
		return (this.get("state") == "coming");
	}.property("state"),
	started: function() {
		console.log(this.get("state") == "live");
		return (this.get("state") == "live");
	}.property("state"),
	matchEvents: (function() {
		return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
			sortProperties: ['minute'],
			sortAscending: false,
			content: this.get('content.matchEvents')
		});
	}).property('content.matchEvents'),
	startMatch: function() {
		this.set("state", "live");
		var self = this;
		this.set("timer", setInterval(function() {

			self.set("minute", self.incrementProperty("minute", 1) );
			console.log(self.get("minute") + ". Minute - " + self.get("state"));
		}, 600) );
	},
	pauseMatch: function() {
		clearInterval(this.get("timer"));
	},
	stopMatch: function() {
		console.log("timer: " + this.get("timer"));
		clearInterval(this.get("timer"));
		this.set("state", "finished");
	}
});

App.AddMatchController = Ember.Controller.extend({
	needs: ["matches", "teams"],
	addMatch: function() {
		var homeAdvantage = App.match.homeAdvantage;
		var opponent = App.match.opponent;
		var form = document.getElementById("form_newMatch");
		var kickoff = new Date(form.date.value + " " + form.time.value);
		console.log(form.date.value);
		console.log(form.time.value);
		var place = App.match.place;
		var teamId = App.match.teamId;
		console.log(homeAdvantage + ", " + opponent + ", " + kickoff.getTime() + ", " + place + ", " + teamId);
		var matches = this.get("controllers.matches.content");
		console.log(matches);
		if (isValidText(opponent) && isValidTime(kickoff) && isValidText(place)) {
			var match = App.Match.createRecord({
				homeAdvantage: homeAdvantage,
				opponent: opponent,
				kickoff: kickoff.getTime(),
				place: place,
				ownGoals: 0,
				opponentGoals: 0,
				state: "coming",
				matchEvents: [],
				minute: 0,
				team: App.Team.find(teamId)
			});
			console.log(match);
			this.transitionToRoute("matches");
		}

	}
});

App.AddMatchEventController = Ember.Controller.extend({
	needs: ["match", "club", "playerList"],
	scorerWithNumber: false,
	assistWithNumber: false,
	valueChanged: function(value) {
		/*var matchEvent = App.MatchEvent2.create({});
		matchEvent.club = this.get("clubReference");*/
		switch(value) {
			case "Tor": {
				App.matchEventTypes.set("goal", true);
				App.matchEvent.set("club", this.get("controllers.club.name"));
				App.goal.set("scorer", null);
				App.goal.set("scorerNr", 0);
				App.assist.set("assist", null);
				App.assist.set("assistNr", 0);
				this.set("withAssist", false);
				break;
			}
			default: {
				App.matchEventTypes.set("goal", false);
			}
		}
	},
	selectedClubChanged: function(clubName) {
		App.goal.set("scorer", null);
		App.goal.set("scorerNr", 0);
		App.assist.set("assist", null);
		App.assist.set("assistNr", 0);
		App.matchEvent.set("club", clubName);
	},
	teamPlayerList: function() {
		var playerList = [];
		console.log(App.matchEvent.club + " == " + this.get("controllers.club.name"));
		if(App.matchEvent.club == this.get("controllers.club.name")) {
			console.log("calculate teamPlayerList");
			var clubPlayerList = this.get("controllers.playerList");
			var match = this.get("controllers.match");
			var selectedTeam = match.get("team");
			console.log("team: " + selectedTeam);
			clubPlayerList.forEach(function(player) {
				var teams = player.get("teams");
				teams.forEach(function(team) {
					if (team.get("id") == selectedTeam.get("id")) {
						playerList.pushObject(player);
						console.log(player);
					}
				});
			});
		}

		return playerList;
	}.property("@each", "match", "playerList", "App.matchEvent.club", "club"),
	availableBodyParts: function() {
		return App.bodyParts.content.filter(function(part) {
			return part.types.contains(App.goal.creation);
		})
	}.property("@each", "App.goal.creation"),
	withAssist: false,
	creations: function() {
		App.goal.set("creation", "");
		if(this.get("withAssist")) {
			return App.creations.content.filter(function(creation) {
				return creation.type == "assist";
			});
		} else {
			return App.creations.content.filter(function(creation) {
				return creation.type == "solo";
			});
		}
	}.property("withAssist"),
	addMatchEvent: function() {
		var type = App.matchEventTypes.selected;
		console.log(type);
		var isValid = false;
		switch(type) {
			case "Tor": {
				var match = this.get("controllers.match");
				var club = App.matchEvent.club;
				if (club && (App.goal.scorer || App.goal.scorerNr) ) {
					isValid = true;

					var isOwnClub = false;
					if (club == this.get("controllers.club.name") ) {
						match.set("ownGoals", match.get("ownGoals")+1);
						isOwnClub = true;
					} else {
						match.set("opponentGoals", match.get("opponentGoals")+1);
					}
					var ownGoals = match.get("ownGoals");
					var opponentGoals = match.get("opponentGoals");
					var homeAdvantage = match.get("homeAdvantage");
					generateGoal(isOwnClub, homeAdvantage, ownGoals, opponentGoals);

				}
				break;
			}
		}

		if (isValid) {
			var title = App.matchEvent.title;
			var text = App.matchEvent.text;
			console.log(title);
			console.log(text);
			var matchEvents = this.get("controllers.match.matchEvents");
			console.log(matchEvents);
			var matchEvent = App.MatchEvent.createRecord({
				minute: this.get("controllers.match.minute"),
				title: title,
				text: text,
				type: type});
			matchEvents.pushObject(matchEvent);
			App.store.commit();
			this.transitionToRoute("match", this.get("controllers.match.model"));
		} else {
			alert("Pflichteingaben unvollständig!");
		}
	}
});

App.LoginController = Ember.Controller.extend({
	login: function(user) {
		var users = App.User.find({ email: user.email });
		var self = this;
		users.one("didLoad", function() {
			var newUser = users.get("firstObject");
			if (newUser && newUser.get("password") == user.password) {
				App.session.set("user", newUser);
				localStorage.userId = newUser.get("id");
				localStorage.firstName = newUser.get("firstName");
				localStorage.lastName = newUser.get("lastName");
				localStorage.email = newUser.get("email");
				localStorage.role = newUser.get("role");
				users.resolve(users.get("firstObject"));
				//self.transitionToRoute("index");
				history.go(-1);
			} else {
				alert("Das Passwort oder die Email ist falsch!");
			}
		});
	}
});