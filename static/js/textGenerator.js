/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 31.05.13
 * Time: 13:13
 * To change this template use File | Settings | File Templates.
 */



function generateGoal(isOwnClub, homeAdvantage, ownGoals, opponentGoals) {
	var club = App.matchEvent.club;
	var scorer;
	var scorerArticle = "";
	var player = App.goal.get("scorer");
	if (player) {
		scorer = player.get("fullName");
	} else {
		scorer = "Nummer " + App.goal.scorerNr;
		scorerArticle = "die ";
	}
	var creation = App.goal.creation;
	var withAssist = App.AddMatchEventController.withAssist;
	var scorerFieldPosition = App.goal.fieldPosition;
	var goalSegment = App.goal.goalSegment;
	var partOfBody = App.goal.partOfBody;

	console.log("Klub: " + club);
	console.log("Torschütze: " + scorer);
	console.log("Entstehung: " + creation);
	console.log("mit Vorlage: " + withAssist);
	console.log("Torschütze Feldposition: " + scorerFieldPosition);
	console.log("Torsegment: " + goalSegment);
	console.log("Körperteil: " + partOfBody);

	var teamsHome = ["die Heimmannschaft", "die Heimelf", "die Gastgeber", "das Heimteam", "die Hausherren", "die gastgebende Mannschaft", "das gastgebende Team", "die Heimtruppe", "die Heimauswahl"];
	var teamsAway = ["der Gast", "das Gastteam", "die Gästemannschaft", "das Auswärtsteam", "die Auswärtsmannschaft", "die Auswärtstruppe", "die Gästetruppe", "die Gästeauswahl", "die Gastelf"];

	var team = getTeam(homeAdvantage, teamsHome, teamsAway);

	var partOfBodyTranslations = [
		{id: "head", text: ["mit dem Kopf", "per Kopf"]}
	];
	var partOfBodyText;

	if(partOfBody) {
		partOfBodyTranslations.forEach(function(part) {
			if (part.id == partOfBody) {
				partOfBodyText = part.text[Math.round(Math.random() * (part.text.length-1) )];
				console.log(partOfBodyText);
			}
		});
	}

	var sentence = scorerArticle.capitalize() + scorer + " erzielt " + partOfBodyText + " das Tor zum " + ownGoals + ":" + opponentGoals + " für " + team + ".";

	var textPatterns = [
		sentence,
		"" + scorerArticle.capitalize() + scorer + " erzielt das Tor zum " + ownGoals + ":" + opponentGoals + " für " + team + ".",
		"" + scorerArticle.capitalize() + scorer + " trifft zum " + ownGoals + ":" + opponentGoals + ".",
		"Das " + ownGoals + ":" + opponentGoals + " fällt durch " + scorerArticle + scorer + " für " + team + "."
	];

	team = getTeam(homeAdvantage, teamsHome, teamsAway);

	App.matchEvent.set("title", "Tor für " + team + " !");
	App.matchEvent.set("text", textPatterns[ Math.round(Math.random() * (textPatterns.length-1) )] );
}
function getTeam(homeAdvantage, teamsHome, teamsAway) {
	return homeAdvantage ? teamsHome[Math.round(Math.random() * (teamsHome.length-1) )] : teamsAway[Math.round(Math.random() * (teamsAway.length-1) )];
}
