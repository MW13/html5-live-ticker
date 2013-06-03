/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 31.05.13
 * Time: 13:12
 * To change this template use File | Settings | File Templates.
 */

const selectedField = "fill:#173b8d;stroke:#FFFFFF;stroke-miterlimit:10;";
const notSelectedField = "fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;";
const selectedGoalSegment = "fill:#173b8d;stroke:#FFFFFF;stroke-miterlimit:10;";
const notSelectedGoalSegment = "fill:#E6E6E6;stroke:#FFFFFF;stroke-miterlimit:10;";
function onMouseOver(evt) {
	evt.target.setAttribute("opacity", "0.5");
}
function onMouseOverMiddleScorer(evt) {
	var field = document.getElementById("fieldScorer");
	var middle = field.getElementById("middle_Scorer");
	var penalty_area_circle = field.getElementById("penalty_area_circle_Scorer");
	var center_circle = field.getElementById("center_circle_Scorer");

	middle.setAttribute("opacity", "0.5");
	penalty_area_circle.setAttribute("opacity", "0.5");
	center_circle.setAttribute("opacity", "0.5");
}
function onMouseOverMiddleAssist(evt) {
	var field = document.getElementById("fieldAssist");
	var middle = field.getElementById("middle_Assist");
	var penalty_area_circle = field.getElementById("penalty_area_circle_Assist");
	var center_circle = field.getElementById("center_circle_Assist");

	middle.setAttribute("opacity", "0.5");
	penalty_area_circle.setAttribute("opacity", "0.5");
	center_circle.setAttribute("opacity", "0.5");
}
function onMouseOut(evt) {
	evt.target.setAttribute("opacity", "1");
}
function onMouseOutMiddleScorer(evt) {
	var field = document.getElementById("fieldScorer");
	var middle = field.getElementById("middle_Scorer");
	var penalty_area_circle = field.getElementById("penalty_area_circle_Scorer");
	var center_circle = field.getElementById("center_circle_Scorer");

	middle.setAttribute("opacity", "1");
	penalty_area_circle.setAttribute("opacity", "1");
	center_circle.setAttribute("opacity", "1");
}
function onMouseOutMiddleAssist(evt) {
	var field = document.getElementById("fieldAssist");
	var middle = field.getElementById("middle_Assist");
	var penalty_area_circle = field.getElementById("penalty_area_circle_Assist");
	var center_circle = field.getElementById("center_circle_Assist");

	middle.setAttribute("opacity", "1");
	penalty_area_circle.setAttribute("opacity", "1");
	center_circle.setAttribute("opacity", "1");
}
function resetFieldStyle(fieldName, fieldType, valueBind) {
	var field = document.getElementById(fieldName);
	var middle = field.getElementById("middle_" + fieldType);
	var penalty_area_circle = field.getElementById("penalty_area_circle_" + fieldType);
	var center_circle = field.getElementById("center_circle_" + fieldType);
	var left = field.getElementById("left_" + fieldType);
	var right = field.getElementById("right_" + fieldType);
	var corner_left = field.getElementById("corner_left_" + fieldType);
	var corner_right = field.getElementById("corner_right_" + fieldType);
	var penalty_area = field.getElementById("penalty_area_" + fieldType);
	var six_yard_box = field.getElementById("six_yard_box_" + fieldType);

	middle.setAttribute("style", notSelectedField);
	penalty_area_circle.setAttribute("style", notSelectedField);
	center_circle.setAttribute("style", notSelectedField);
	left.setAttribute("style", notSelectedField);
	right.setAttribute("style", notSelectedField);
	corner_left.setAttribute("style", notSelectedField);
	corner_right.setAttribute("style", notSelectedField);
	penalty_area.setAttribute("style", notSelectedField);
	six_yard_box.setAttribute("style", notSelectedField);

	valueBind.set("fieldPosition", null);
}
function onClickScorer(evt) {
	if (evt.target.getAttribute("style") == selectedField) {
		resetFieldStyle("fieldScorer", "Scorer", App.goal);
	} else {
		resetFieldStyle("fieldScorer", "Scorer", App.goal);
		evt.target.setAttribute("style", selectedField);
		App.goal.set("fieldPosition", evt.target.id);
	}
}
function onClickAssist(evt) {
	if (evt.target.getAttribute("style") == selectedField) {
		resetFieldStyle("fieldAssist", "Assist", App.assist);
	} else {
		resetFieldStyle("fieldAssist", "Assist", App.assist);
		evt.target.setAttribute("style", selectedField);
		App.assist.set("fieldPosition", evt.target.id);
	}
}
function onClickMiddleScorer(evt) {
	var field = document.getElementById("fieldScorer");
	var middle = field.getElementById("middle_Scorer");
	var penalty_area_circle = field.getElementById("penalty_area_circle_Scorer");
	var center_circle = field.getElementById("center_circle_Scorer");

	if (middle.getAttribute("style") == selectedField) {
		resetFieldStyle("fieldScorer", "Scorer", App.goal);
	} else {
		resetFieldStyle("fieldScorer", "Scorer", App.goal);
		middle.setAttribute("style", selectedField);
		penalty_area_circle.setAttribute("style", selectedField);
		center_circle.setAttribute("style", selectedField);
		App.assist.set("fieldPosition", "middle");
	}
}
function onClickMiddleAssist(evt) {
	var field = document.getElementById("fieldAssist");
	var middle = field.getElementById("middle_Assist");
	var penalty_area_circle = field.getElementById("penalty_area_circle_Assist");
	var center_circle = field.getElementById("center_circle_Assist");

	if (middle.getAttribute("style") == selectedField) {
		resetFieldStyle("fieldAssist", "Assist", App.assist);
	} else {
		resetFieldStyle("fieldAssist", "Assist", App.assist);
		middle.setAttribute("style", selectedField);
		penalty_area_circle.setAttribute("style", selectedField);
		center_circle.setAttribute("style", selectedField);
		App.assist.set("fieldPosition", "middle");
	}
}
function resetGoalSegments() {
	var goal = document.getElementById("goalSegment");
	goal.getElementById("upper_left").setAttribute("style", notSelectedGoalSegment);
	goal.getElementById("upper_center").setAttribute("style", notSelectedGoalSegment);
	goal.getElementById("upper_right").setAttribute("style", notSelectedGoalSegment);
	goal.getElementById("lower_left").setAttribute("style", notSelectedGoalSegment);
	goal.getElementById("lower_center").setAttribute("style", notSelectedGoalSegment);
	goal.getElementById("lower_right").setAttribute("style", notSelectedGoalSegment);
	App.goal.set("goalSegment", null);
}
function onClickGoalSegment(evt) {
	if (evt.target.getAttribute("style") == selectedGoalSegment) {
		resetGoalSegments();
	} else {
		resetGoalSegments();
		evt.target.setAttribute("style", selectedGoalSegment);
		App.goal.set("goalSegment", evt.target.id);
	}
}