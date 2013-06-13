/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 06.05.13
 * Time: 12:34
 * To change this template use File | Settings | File Templates.
 */

window.Models = {};

SOCKET = "/";

App.Store = DS.Store.extend({
	/*adapter: DS.FixtureAdapter.extend({
		queryFixtures: function (fixtures, query){

			return fixtures.filter(function(fixture){
				var res = true;
				for(attr in query){
					if (query.hasOwnProperty(attr)){
						res = res && (fixture[attr] == query[attr]);
					}
				}
				return res;
			});
		}
	})*/
	adapter: App.SocketAdapter.create({})
});

App.store = App.Store.create({});

/*
DS.FixtureAdapter.map('App.Club', {
	teams: {embedded: 'load'}
});

DS.FixtureAdapter.map('App.Team', {
	matches: {embedded: 'load'},
	playerList: {embedded: "load"}
});

DS.FixtureAdapter.map('App.User', {
	primaryKey: 'email'
});*/

/*
App.store = DS.Store.create({
	revision: 12,
	adapter: DS.SocketAdapter.create({})
});

DS.Model.reopen({
	save: function () {
		App.store.commit();
		return this;
	}
});
*/
/*
DS.SocketAdapter.map('App.Club', {
	primaryKey: 'name'
});

DS.SocketAdapter.map('App.Team', {
	list: {embedded: 'always'}
});
*/

App.Club = DS.Model.extend({
	name: DS.attr("string"),
	article: DS.attr("string"),
	short: DS.attr("string"),
	teams: DS.hasMany("App.Team"),
	players: DS.hasMany("App.Player")
});

App.Team = DS.Model.extend({
	name: DS.attr("string"),
	club: DS.belongsTo("App.Club"),
	matches: DS.hasMany("App.Match"),
	players: DS.hasMany("App.Player")
});

App.Player = DS.Model.extend({
	firstName: DS.attr("string"),
	lastName: DS.attr("string"),
	birthday: DS.attr("date"),
	team: DS.belongsTo("App.Team"),
	club: DS.belongsTo("App.Club"),
	age: function() {
		return age(this.get("birthday"));
	}.property("birthday"),
	fullName: function() {
		return this.get("firstName") + " " + this.get("lastName");
	}.property("lastName", "firstName"),
	fullNameInverse: function() {
		return this.get("lastName") + " " + this.get("firstName");
	}.property("lastName", "firstName")
});

App.Match = DS.Model.extend({
	team: DS.belongsTo("App.Team"),
	homeAdvantage: DS.attr("boolean"),
	opponent: DS.attr("string"),
	kickoff: DS.attr("date"),
	place: DS.attr("string"),
	ownGoals: DS.attr("number"),
	opponentGoals: DS.attr("number"),
	state: DS.attr("string"),
	matchEvents: DS.hasMany("App.MatchEvent"),
	minute: DS.attr("number")
});

App.MatchEvent = DS.Model.extend({
	match: DS.belongsTo("App.Match"),
	minute: DS.attr("number"),
	text: DS.attr("string"),
	type: DS.attr("string"),
	title: DS.attr("string")
});

App.User = DS.Model.extend({
	firstName: DS.attr("string"),
	lastName: DS.attr("string"),
	email: DS.attr("string"),
	password: DS.attr("string"),
	role: DS.attr("string"),
	fullName: function() {
		return this.get('firstName') + " " + this.get('lastName');
	}.property('firstName', 'lastName').cacheable()
});

App.MatchEvent.FIXTURES = [
	{
		id: 1001,
		match: 301,
		minute: 10,
		title: "Tor für die Heimelf",
		text: "Spieler Nummer 4 schießt flach ins linke untere Eck",
		type: "Tor"
	},
	{
		id: 1002,
		match: 301,
		minute: 23,
		title: "Tor für die Gäste",
		text: "Spieler Nummer 7 köpft ins rechte obere Eck",
		type: "Tor"
	},
	{
		id: 1003,
		match: 301,
		minute: 31,
		title: "Tor für die Heimelf",
		text: "Spieler Nummer 4 schießt flach ins linke untere Eck",
		type: "Tor"
	},
	{
		id: 1004,
		match: 301,
		minute: 39,
		title: "Tor für die Gäste",
		text: "Spieler Nummer 7 köpft ins rechte obere Eck",
		type: "Tor"
	},
	{
		id: 1005,
		match: 301,
		minute: 44,
		title: "Tor für die Heimelf",
		text: "Spieler Nummer 4 schießt flach ins linke untere Eck",
		type: "Tor"
	},
	{
		id: 1006,
		match: 301,
		minute: 56,
		title: "Tor für die Gäste",
		text: "Spieler Nummer 7 köpft ins rechte obere Eck",
		type: "Tor"
	}
];

App.Club.FIXTURES = [
	{
		id: 101,
		name: "1. SV Oberkrämer",
		article: "Der",
		short: "SVO",
		teams: []
	}
];

App.Team.FIXTURES = [
	{
		id: 201,
		name: "1. Männer",
		club: 101,
		matches: []
	},
	{
		id: 202,
		name: "2. Männer",
		club: 101,
		matches: []
	}
];

App.Match.FIXTURES = [
	{
		id: 301,
		club: 101,
		team: 201,
		homeAdvantage: true,
		opponent: "Hertha BSC",
		kickoff: "1369670400000",
		place: "Vehlefanz",
		ownGoals: 2,
		opponentGoals: 1,
		state: "finished",
		matchEvents: [1001, 1002, 1003, 1004, 1005, 1006],
		minute: 93
	},
	{
		id: 302,
		club: 101,
		team: 202,
		homeAdvantage: false,
		opponent: "Union Berlin",
		kickoff: "1369659600000",
		place: "Berlin",
		ownGoals: 4,
		opponentGoals: 3,
		state: "finished",
		matchEvents: [],
		minute: 91
	},
	{
		id: 303,
		club: 101,
		team: 201,
		homeAdvantage: true,
		opponent: "FC Schalke 04",
		kickoff: "1369744200000",
		place: "Vehlefanz",
		ownGoals: 1,
		opponentGoals: 3,
		state: "live",
		matchEvents: [],
		minute: 25
	},
	{
		id: 304,
		club: 101,
		team: 202,
		homeAdvantage: false,
		opponent: "Hamburger SV",
		kickoff: "1369933200000",
		place: "Hamburg",
		ownGoals: 0,
		opponentGoals: 0,
		state: "coming",
		matchEvents: [],
		minute: 0
	},
	{
		id: 305,
		club: 101,
		team: 201,
		homeAdvantage: false,
		opponent: "Hoffenheim",
		kickoff: "1369742400000",
		place: "Hoffenheim",
		ownGoals: 1,
		opponentGoals: 1,
		state: "live",
		matchEvents: [],
		minute: 55
	}
];

App.User.FIXTURES = [
	{
		id: 501,
		firstName: "Markus",
		lastName: "Woltersdorf",
		email: "mwoltersdorf@freenet.de",
		password: "test",
		role: "moderator"
	}
];

App.Player.FIXTURES = [
	{
		id: 601,
		firstName: "Paul",
		lastName: "Haß",
		birthday: "1991-09-07",
		teams: [201],
		club: 101
	},
	{
		id: 602,
		firstName: "Christopher",
		lastName: "Reuß",
		birthday: "1991-11-18",
		teams: [201, 202],
		club: 101
	},
	{
		id: 603,
		firstName: "Dennis",
		lastName: "Lindenberg",
		birthday: "1994-09-13",
		teams: [202],
		club: 101
	}
	,
	{
		id: 604,
		firstName: "Markus",
		lastName: "Woltersdorf",
		birthday: "1989-09-11",
		teams: [201],
		club: 101
	}
];