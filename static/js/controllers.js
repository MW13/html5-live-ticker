/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 16.05.13
 * Time: 21:50
 * To change this template use File | Settings | File Templates.
 */
App.ApplicationController = Ember.Controller.extend({
	needs: ["club"],
	logout: function () {
		this.transitionToRoute("index");
		App.session.set("user", null);
		localStorage.userId = null;
		localStorage.firstName = null;
		localStorage.lastName = null;
		localStorage.email = null;
		localStorage.role = null;
	},
	init: function () {
		if (localStorage.userId != "null") {
			App.session.set("user", {
				id: localStorage.userId,
				firstName: localStorage.firstName,
				lastName: localStorage.lastName,
				email: localStorage.email,
				role: localStorage.role
			});
		} else {
			App.session.set("user", null);
		}
	}
});

App.Session = Ember.Object.extend({
	user: null,
	loggedIn: function() {
		return this.get("user.id") != null;
	}.property("user")
});

App.session = App.Session.create({});

App.LoginController = Ember.Controller.extend({
	login: function (user) {
		var users = App.User.find({ email: user.email });
		users.one("didLoad", function () {
			var newUser = users.get("firstObject");
			if (newUser && newUser.get("password") == user.password) {
				App.session.set("user", newUser);
				localStorage.userId = newUser.get("id");
				localStorage.firstName = newUser.get("firstName");
				localStorage.lastName = newUser.get("lastName");
				localStorage.email = newUser.get("email");
				localStorage.role = newUser.get("role");
				users.resolve(users.get("firstObject"));
				history.go(-1);
			} else {
				alert("Das Passwort oder die Email ist falsch!");
			}
		});
	}
});

App.MatchesController = Ember.ArrayController.extend({
	needs: ["club"],
	clubBinding: 'controllers.club',
	finishedMatches: function () {
		var matches = this.filter(function (match) {
			return match.get('state') == "finished";
		});
		return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
			sortProperties: ['kickoff'],
			sortAscending: false,
			content: matches
		});
	}.property('@each.state', '@each.kickoff'),
	liveMatches: function () {
		var matches = this.filter(function (match) {
			return match.get('state') == "live";
		});
		return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
			sortProperties: ['kickoff'],
			sortAscending: false,
			content: matches
		});
	}.property('@each.state', '@each.kickoff'),
	comingMatches: function () {
		var matches = this.filter(function (match) {
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
	teamHome: function () {
		if (this.get("content.homeAdvantage")) {
			return this.get("controllers.club.content.name");
		} else {
			return this.get("content.opponent");
		}
	}.property("content.homeAdvantage", "content.opponent"),
	teamAway: function () {
		if (this.get("content.homeAdvantage")) {
			return this.get("content.opponent");
		} else {
			return this.get("controllers.club.content.name");
		}
	}.property("content.homeAdvantage", "content.opponent"),
	goalsHome: function () {
		if (this.get("content.homeAdvantage")) {
			return this.get("content.ownGoals");
		} else {
			return this.get("content.opponentGoals");
		}
	}.property("content.homeAdvantage", "content.ownGoals", "content.opponentGoals"),
	goalsAway: function () {
		if (this.get("content.homeAdvantage")) {
			return this.get("content.opponentGoals");
		} else {
			return this.get("content.ownGoals");
		}
	}.property("content.homeAdvantage", "content.ownGoals", "content.opponentGoals"),
	time: function () {
		var kickoff = new Date();
		kickoff.setTime(this.get("content.kickoff"));
		return time(kickoff);
	}.property("content.kickoff"),
	date: function () {
		var kickoff = new Date();
		kickoff.setTime(this.get("content.kickoff"));
		return date(kickoff);
	}.property("content.kickoff"),
	teamGroup: function () {
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
	content: [
		{id: "dribbling", name: "Dribbling", type: "solo"},
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
		{id: "cross_kick", name: "Querpass", type: "assist"}
	]
});

App.bodyParts = Ember.Object.create({
	content: [
		{id: "head", name: "Kopf", types: ["easy_goal", "lob", "corner_cross", "cross_high", "free_kick_cross"]},
		{id: "foot_left", name: "Fuß (links)", types: ["dribbling", "easy_goal", "corner", "penalty", "long_shot", "free_kick", "lob", "double_pass", "corner_cross", "cross_high", "cross_low", "free_kick_short", "free_kick_cross", "cross_kick"]},
		{id: "foot_right", name: "Fuß (rechts)", types: ["dribbling", "easy_goal", "corner", "penalty", "long_shot", "free_kick", "lob", "double_pass", "corner_cross", "cross_high", "cross_low", "free_kick_short", "free_kick_cross", "cross_kick"]},
		{id: "heel", name: "Hacke", types: ["easy_goal", "double_pass", "corner_cross", "cross_high", "cross_low", "free_kick_cross", "cross_kick"]},
		{id: "knee", name: "Knie", types: ["easy_goal", "double_pass", "corner_cross", "cross_high", "free_kick_cross", "cross_kick"]}
	]
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

App.MatchController = Ember.ObjectController.extend({
	timer: null,
	notStarted: function () {
		return (this.get("state") == "coming");
	}.property("state"),
	started: function () {
		return (this.get("state") == "live");
	}.property("state"),
	matchEvents: (function () {
		var matchId = this.get("content.id");
		return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
			sortProperties: ['minute'],
			sortAscending: false,
			content: App.MatchEvent.filter(function (matchEvent) {
				return matchEvent.get("match.id") == matchId;
			})
		});
	}).property('content.matchEvents', "App.MatchEvent"),
	startMatch: function () {
		this.set("state", "live");
		this.get("transaction").commit();
		this.get("store").get("adapter").incrementMinute(this.get("store"), "App.Match", this.get("content"));
	},
	pauseMatch: function () {
	},
	stopMatch: function () {
		this.set("state", "finished");
		this.get("transaction").commit();
		ws.emit("stopMatch", this.get("id"));
	}
});

App.AddMatchController = Ember.Controller.extend({
	needs: ["matches", "teams"],
	homeAdvantage: false,
	opponent: "",
	date: "",
	time: "",
	place: "",
	teamId: 0,
	addMatch: function () {
		var homeAdvantage = this.get("homeAdvantage");
		var opponent = this.get("opponent");
		var date = this.get("date");
		var time = this.get("time");
		var kickoff = new Date(date + " " + time);
		var place = this.get("place");
		var teamId = this.get("teamId");
		var matches = this.get("controllers.matches.content");
		if (isValidText(opponent) && isValidTime(kickoff) && isValidText(place)) {
			var match = App.Match.createRecord({
				homeAdvantage: homeAdvantage,
				opponent: opponent,
				kickoff: kickoff,
				place: place,
				ownGoals: 0,
				opponentGoals: 0,
				state: "coming",
				matchEvents: [],
				minute: 0,
				team: App.Team.find(teamId)
			});
			match.transaction.commit();
			this.transitionToRoute("matches");
		}
	}
});

App.AddMatchEventController = Ember.Controller.extend({
	needs: ["club"],
	scorerWithNumber: false,
	assistWithNumber: false,
	isOwnClub: function () {
		return App.matchEvent.get("club") == this.get("controllers.club.name");
	}.property("controllers.club.name", "App.matchEvent.club"),
	valueChanged: function (value) {
		switch (value) {
			case "Tor":
			{
				App.matchEventTypes.set("goal", true);
				App.matchEvent.set("club", this.get("controllers.club.name"));
				App.goal.set("scorer", null);
				App.goal.set("scorerNr", 0);
				App.assist.set("assist", null);
				App.assist.set("assistNr", 0);
				this.set("withAssist", false);
				break;
			}
			// offen für weitere Spielereignisse
			default:
			{
				App.matchEventTypes.set("goal", false);
			}
		}
	},
	selectedClubChanged: function (clubName) {
		App.goal.set("scorer", null);
		App.goal.set("scorerNr", 0);
		App.assist.set("assist", null);
		App.assist.set("assistNr", 0);
		App.matchEvent.set("club", clubName);
	},
	teamPlayerList: function () {
		var teamId = this.get("content.team.id");
		var playerList = App.Player.filter(function (player) {
			return teamId && player.get("team.id") == teamId;
		});

		return playerList;
	}.property("@each", "selectedClub"),
	availableBodyParts: function () {
		return App.bodyParts.content.filter(function (part) {
			return part.types.contains(App.goal.creation);
		})
	}.property("@each", "App.goal.creation"),
	withAssist: false,
	creations: function () {
		App.goal.set("creation", "");
		if (this.get("withAssist")) {
			return App.creations.content.filter(function (creation) {
				return creation.type == "assist";
			});
		} else {
			return App.creations.content.filter(function (creation) {
				return creation.type == "solo";
			});
		}
	}.property("withAssist"),
	addMatchEvent: function () {
		var type = App.matchEventTypes.selected;
		var isValid = false;
		switch (type) {
			case "Tor":
			{
				var match = this.get("content");
				var club = App.matchEvent.club;
				if (club && (App.goal.scorer || App.goal.scorerNr)) {
					isValid = true;

					var isOwnClub = false;
					if (club == this.get("controllers.club.name")) {
						match.set("ownGoals", match.get("ownGoals") + 1);
						isOwnClub = true;
					} else {
						match.set("opponentGoals", match.get("opponentGoals") + 1);
					}
					var ownGoals = match.get("ownGoals");
					var opponentGoals = match.get("opponentGoals");
					var homeAdvantage = match.get("homeAdvantage");
					var withAssist = this.get("withAssist");
					generateGoal(isOwnClub, homeAdvantage, ownGoals, opponentGoals, withAssist);
				}
				break;
			}
		}

		if (isValid) {
			var title = App.matchEvent.title;
			var text = App.matchEvent.text;
			var matchEvents = this.get("content.matchEvents");
			var matchEvent = App.MatchEvent.createRecord({
				minute: this.get("content.minute"),
				title: title,
				text: text,
				type: type});
			matchEvents.addObject(matchEvent);
			matchEvent.get("transaction").commit();
			this.transitionToRoute("match", this.get("content"));
		} else {
			alert("Pflichteingaben unvollständig!");
		}
	}
});

App.PlayersController = Ember.ArrayController.extend({
	clubPlayerList: function () {
		return App.Player.filter(function (player) {
			return player.get("id");
		});
	}.property("@each"),
	edit: function (player) {
		this.transitionToRoute("player", player);
	},
	delete: function (player) {
		player.deleteRecord();
		player.save();
		this.transitionToRoute("players");
	}
});

App.PlayerController = Ember.ObjectController.extend({
	savePlayer: function () {
		var firstName = this.get("firstName");
		var lastName = this.get("lastName");
		var bday = new Date(this.get("birthday"));
		if (isValidText(firstName) && isValidText(lastName) && isValidBday(bday)) {
			this.set("firstName", firstName);
			this.set("lastName", lastName);
			this.set("birthday", bday);
			this.get("content").save();
		}
	}
});

App.PlayersNewController = Ember.ObjectController.extend({
	needs: ["club"],
	firstName: "",
	lastName: "",
	birthday: "",
	createPlayer: function () {
		var firstName = this.get("firstName");
		var lastName = this.get("lastName");
		var bday = new Date(this.get("birthday"));
		if (isValidText(firstName) && isValidText(lastName) && isValidBday(bday)) {
			var club = this.get("controllers.club");
			var clubId = club.get("id");
			var player = Ember.Object.create({
				firstName: firstName,
				lastName: lastName,
				birthday: bday,
				club: App.Club.find(clubId)
			});
			var newPlayer = App.Player.createRecord(player);
			newPlayer.save();

			this.set("firstName", "");
			this.set("lastName", "");
			this.set("birthday", "");

			this.transitionToRoute("players");
		}
	}
});

App.TeamsController = Ember.ArrayController.extend({
	needs: ["club", "players"],
	clubBinding: "controllers.club",
	clubTeams: function () {
		var clubId = this.get("controllers.club.id");
		var teams = this.filter(function (team) {
			return (team.get("club.id") == clubId);
		});
		return this.get("content");
	}.property("@each"),
	clubPlayerList: function () {
		var playerList = App.Player.filter(function (player) {
			return player.get("id") && player.get("team.id") == null;
		});
		return playerList;
	}.property("@each.team.id", "controllers.players", "selectedTeamId"),
	selectedTeamId: null,
	selectedTeamName: function () {
		return App.Team.find(this.get("selectedTeamId")).get("name");
	}.property("selectedTeamId"),
	teamPlayerList: function () {
		var selectedTeamId = this.get("selectedTeamId");
		var teamPlayerList = App.Player.filter(function (player) {
			return selectedTeamId && player.get("team.id") == selectedTeamId;
		});
		return teamPlayerList;
	}.property("@each.team.id", "controllers.players", "selectedTeamId"),
	valueChanged: function (value) {
		this.set("selectedTeamId", value);
	},
	dropPlayer: function (player) {
		var teamId = player.get("team.id");
		var id = this.get("selectedTeamId");
		if (teamId != id) {
			player.set("team", App.Team.find(id));
			player.get('transaction').commit();
		} else if (teamId == id) {
			player.set("team", null);
			player.get('transaction').commit();
		}
	}
});

App.TeamController = Ember.ObjectController.extend({});

App.article = Ember.Object.create({
	content: ["der", "die", "das"],
	selectedArticle: null
});

App.ClubController = Ember.ObjectController.extend({
	saveClub: function () {
		var name = this.get("name");
		var short = this.get("short");
		if (isValidText(name) && isValidText(short)) {
			this.set("name", name);
			this.set("article", App.article.selectedArticle);
			this.set("short", short);
			this.get("content").save();
		}
	}
});