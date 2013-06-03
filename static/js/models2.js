/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 19.04.13
 * Time: 12:40
 * To change this template use File | Settings | File Templates.
 */
App.Club = DS.Model.extend({
	name: DS.attr("string")
});


App.Match = DS.Model.extend({
	homeAdvantage: DS.attr("boolean"),
	opponent: DS.attr("string"),
	kickoff: DS.attr("date"),
	place: DS.attr("string"),
	team: DS.attr("string"),
	ownGoals: DS.attr("number"),
	opponentGoals: DS.attr("number")
});

App.Match.FIXTURES = [
	{homeAdvantage: true, teamHome: "1. SV Oberkrämer", teamAway: "SC Oberhavel Velten", team: "Herren", kickoff: "2013-02-07T16:44:57", place: "Vehlefanz", goalsHome: 0, goalsAway: 0},
	{homeAdvantage: false, teamHome: "Eintracht Bötzow", teamAway: "1. SV Oberkrämer", team: "B-Junioren", kickoff: "2013-04-11T16:40:00", place: "Velten", goalsHome: 3, goalsAway: 1}
]
/*
App.Match = Ember.Object.extend({
	homeAdvantage: false,
	teamHome: null,
	teamAway: null,
	goalsHome: 0,
	goalsAway: 0,
	opponent: null,
	date: null,
	kickoff: null,
	place: null,
	teamGroup: null
});
*/
/*
EME.Photo = DS.Model.extend({
	imageTitle: DS.attr('string'),
	imageUrl: DS.attr('string')
});
*/