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
	adapter: App.SocketAdapter.create({})
});

App.store = App.Store.create({});

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
	age: function () {
		return age(this.get("birthday"));
	}.property("birthday"),
	fullName: function () {
		return this.get("firstName") + " " + this.get("lastName");
	}.property("lastName", "firstName"),
	fullNameInverse: function () {
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
	fullName: function () {
		return this.get('firstName') + " " + this.get('lastName');
	}.property('firstName', 'lastName').cacheable()
});