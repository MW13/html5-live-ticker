/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 31.05.13
 * Time: 13:13
 * To change this template use File | Settings | File Templates.
 */

/*
	Die Textbausteine sind der Einfachheit halber hardgecoded.
	Man könnte jedoch diese aus einer externen Ressource laden,
	beispielsweise direkt aus der Datenbank oder über eine JSON-Datei als eine Art Sprachdatei.
 */
function generateGoal(isOwnClub, homeAdvantage, ownGoals, opponentGoals, withAssist) {
	var club = App.matchEvent.club;
	var scorer = App.goal.scorer;
	var creation = App.goal.creation;
	var scorerFieldPosition = App.goal.fieldPosition;
	var providerFieldPosition = App.assist.fieldPosition;
	var goalSegment = App.goal.goalSegment;
	var partOfBody = App.goal.partOfBody;
	var assist = App.assist.assist;

	var teamTitle = getTeam(homeAdvantage, club);
	var teamText = getTeam(homeAdvantage);
	var scorerText = scorer ? scorer.get("fullName") : ("Nummer " + App.goal.scorerNr);
	var scorerArticle = scorer ? "" : "die ";
	var provider = assist ? assist.get("fullName") : ("Nummer " + App.assist.assistNr);
	var verb = calculateVerbText();
	var creationSoloText = calculateCreationSolo(creation);
	var creationAssistText = calculateCreationAssist(creation);
	var partOfBodyText = calculatePartOfBody(partOfBody);
	var goalSegmentText = calculateGoalSegment(goalSegment);
	var scorerFieldPositionText = calculateScorerFieldPosition(scorerFieldPosition);
	var providerFieldPositionText = calculateScorerFieldPosition(providerFieldPosition);
	providerFieldPositionText = (creation=="corner") ? "" : providerFieldPositionText;
	var ball = calculateBallText(verb);
	var matchResult = ownGoals + ":" + opponentGoals;
	var sign = withAssist ? ", " : "";
	var connective = (creation=="double_pass") ? " mit " : " von ";

	var assistText = creationAssistText + connective + provider + providerFieldPositionText;

	var textPatterns = [
		scorerArticle.capitalize() + scorerText + " " + verb.activity + " " + creationSoloText + ball + partOfBodyText +
			goalSegmentText + scorerFieldPositionText + " " + verb.article + " " + matchResult + " für " + teamText + sign + assistText + "."
	];

	if (withAssist) {
		var assistPattern = assistText.capitalize() + sign + verb.activity + " " + scorerArticle + scorerText + " " + creationSoloText + ball + partOfBodyText +
			goalSegmentText + scorerFieldPositionText + " " + verb.article + " " + matchResult + " für " + teamText + ".";
		textPatterns.push(assistPattern);
	}

	App.matchEvent.set("title", "Tor für " + teamTitle + " !");
	App.matchEvent.set("text", textPatterns[ Math.round(Math.random() * (textPatterns.length - 1))]);
}
function getTeam(homeAdvantage, club) {
	var teamsHome = ["die Heimmannschaft", "die Heimelf", "die Gastgeber", "das Heimteam", "die Hausherren", "die gastgebende Mannschaft", "das gastgebende Team", "die Heimtruppe", "die Heimauswahl"];
	var teamsAway = ["den Gast", "das Gästeteam", "die Gästemannschaft", "das Auswärtsteam", "die Auswärtsmannschaft", "die Auswärtstruppe", "die Gästetruppe", "die Gästeauswahl", "die Gastelf"];
	if (club) {
		homeAdvantage ? teamsHome.push(club) : teamsAway.push(club);
	}
	return homeAdvantage ? teamsHome[Math.round(Math.random() * (teamsHome.length - 1))] : teamsAway[Math.round(Math.random() * (teamsAway.length - 1))];
}
function calculateVerbText() {
	var verbObjects = [
		{activity: "erzielt", article: "das", putInBall: false},
		{activity: "macht", article: "das", putInBall: false},
		{activity: "trifft", article: "zum", putInBall: false},
		{activity: "vollendet", article: "zum", putInBall: false},
		{activity: "verwandelt", article: "zum", putInBall: true},
		{activity: "köpft", article: "zum", putInBall: true},
		{activity: "schießt", article: "zum", putInBall: true}
	];
	return verbObjects[Math.round(Math.random() * (verbObjects.length - 1))];
}
function calculateCreationSolo(creationSolo) {
	var creationTranslations = [
		{id: "dribbling", text: [" nach einem Dribbling"]},
		{id: "easy_goal", text: [" mit einem Abstauber", "per Abstauber"]},
		{id: "corner", text: [" mit einer direkten Ecke", " mit direkter Ecke", " mit direktem Eckstoß", " mit einem direkten Eckstoß", " per direkter Ecke", " per direktem Eckstoß"]},
		{id: "penalty", text: [" mit einem Elfmeter", " per Elfmeter", " mit einem Strafstoß", " per Strafstoß"]},
		{id: "long_shot", text: [" mit einem Fernschuss", " mit einem Weitschuss", " per Fernschuss", " per Weitschuss"]},
		{id: "free_kick", text: [" mit einem direkten Freistoß", " mit direktem Freistoß", " per direktem Freistoß"]},
		{id: "lob", text: [" mit einem Lupfer", " per Lupfer"]}
	];
	var creationText = "";
	if (creationSolo) {
		creationTranslations.forEach(function (creation) {
			if (creation.id == creationSolo) {
				creationText = creation.text[Math.round(Math.random() * (creation.text.length - 1))];
				console.log(creationText);
			}
		});
	}
	return creationText;
}
function calculateCreationAssist(creationAssist) {
	var creationTranslations = [
		{id: "double_pass", text: ["nach einem Doppelpass"]},
		{id: "corner_cross", text: ["nach einer Ecke", "nach einem Eckstoß"]},
		{id: "cross_high", text: ["nach einer hohen Flanke", "nach einer hohen Hereingabe"]},
		{id: "cross_low", text: ["nach einer flachen Flanke", "nach einer flachen Hereingabe"]},
		{id: "free_kick_short", text: ["nach einer Freistoßablage", "nach Ablage"]},
		{id: "free_kick_cross", text: ["nach einer Flanke bei einem Freistoß", "nach einer Hereingabe bei einem Freistoß", "nach einer Freistoßflanke", "nach einer Freistoßhereingabe"]},
		{id: "cross_kick", text: ["nach einem Querpass", "nach einem seitlichen Zuspiel"]}
	];
	var creationText = "";
	if (creationAssist) {
		creationTranslations.forEach(function (creation) {
			if (creation.id == creationAssist) {
				creationText = creation.text[Math.round(Math.random() * (creation.text.length - 1))];
			}
		});
	}
	return creationText;
}
function calculatePartOfBody(partOfBody) {
	var partOfBodyTranslations = [
		{id: "head", text: [" mit dem Kopf", " per Kopf"]},
		{id: "foot_left", text: [ " mit dem linken Fuß"]},
		{id: "foot_right", text: [" mit dem rechten Fuß"]},
		{id: "heel", text: [" mit der Hacke", " per Hacke"]},
		{id: "knee", text: [" mit dem Knie"]}
	];
	var partOfBodyText = "";
	if (partOfBody) {
		partOfBodyTranslations.forEach(function (part) {
			if (part.id == partOfBody) {
				partOfBodyText = part.text[Math.round(Math.random() * (part.text.length - 1))];
			}
		});
	}
	return partOfBodyText;
}
function calculateGoalSegment(goalSegment) {
	var goalSegmentTranslations = [
		{id: "upper_left", text: [" ins obere linke Eck", " ins obere linke Toreck", " ins linke obere Eck", " ins linke obere Toreck"]},
		{id: "upper_center", text: [" zentral oben ins Tor", " zentral ins obere Tor", " mittig oben ins Tor", " mittig ins obere Tor"]},
		{id: "upper_right", text: [" ins obere rechte Eck", " ins obere rechte Toreck", " ins rechte obere Eck", " ins rechte obere Toreck"]},
		{id: "lower_left", text: [" ins untere linke Eck", " ins untere linke Toreck", " ins linke untere Eck", " ins linke untere Toreck"]},
		{id: "lower_center", text: [" zentral unten ins Tor", " zentral ins untere Tor", " mittig unten ins Tor", " mittig ins untere Tor"]},
		{id: "lower_right", text: [" ins untere rechte Eck", " ins untere rechte Toreck", " ins rechte untere Eck", " ins rechte untere Toreck"]}
	];
	var goalSegmentText = "";
	if (goalSegment) {
		goalSegmentTranslations.forEach(function (segment) {
			if (segment.id == goalSegment) {
				goalSegmentText = segment.text[Math.round(Math.random() * (segment.text.length - 1))];
			}
		});
	}
	return goalSegmentText;
}
function calculateScorerFieldPosition(scorerFieldPosition) {
	var scorerFieldPositionTranslations = [
		{id: "left_Scorer", text: [" aus dem linken Halbfeld"]},
		{id: "right_Scorer", text: [" aus dem rechten Halbfeld"]},
		{id: "corner_left_Scorer", text: [" von der linken Seite"]},
		{id: "corner_right_Scorer", text: [" von der rechten Seite"]},
		{id: "middle", text: [" aus der Zentralen"]},
		{id: "penalty_area_Scorer", text: [" aus dem Sechszehner", " aus dem Sechszehnmeterraum", " aus dem Strafraum"]},
		{id: "six_yard_box_Scorer", text: [" aus dem Fünfmeterraum", " aus dem Fünfer"]}
	];
	var scorerFieldPositionText = "";
	if (scorerFieldPosition) {
		scorerFieldPositionTranslations.forEach(function (position) {
			if (position.id == scorerFieldPosition) {
				scorerFieldPositionText = position.text[Math.round(Math.random() * (position.text.length - 1))];
			}
		});
	}
	return scorerFieldPositionText;
}
function calculateBallText(verb) {
	var balls = [" das Spielgerät", " den Ball", " das Leder", " die Kugel", " den Fußball"];
	return verb.putInBall ? balls[Math.round(Math.random() * (balls.length - 1))] : "";
}
