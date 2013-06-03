/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 06.05.13
 * Time: 16:34
 * To change this template use File | Settings | File Templates.
 */
/*
App.MatchView = Ember.View.extend({
	template: Ember.Handlebars.compile("<p>{{teamHome}} - {{teamAway}}</p><h1>{{goalsHome}} : {{goalsAway}}</h1><p>{{date}} {{team}} {{time}}</p>"),
	templateName: "matchOverview",
	controller: App.MatchController,
	click: function(item) {
		alert("You clicked ");
	},
	emptyView: Ember.View.extend({
		template: Ember.Handlebars.compile("The collection is empty")
	})
});*/

//App.MatchesView = Ember.CollectionView.extend({});

App.RegisterButton = Ember.View.extend({
	click: function(evt) {
		var form = document.getElementById("registerForm");
		var email = form.email.value;
		var firstname = form.firstname.value;
		var lastname = form.lastname.value;
		var password1 = form.password1.value;
		var password2 = form.password2.value;
		if(password1.length != 0 && password1 == password2) {
			var moderator = Ember.Object.create({
				email: email,
				firstname: firstname,
				lastname: lastname,
				password: password1
			});
			this.get("controller").send("register", moderator);
		} else {
			alert("Die Passwörter sind nicht identisch!");
		}
	}
});

App.LoginButton = Ember.View.extend({
	classNames: ["btn"],
	template: Ember.Handlebars.compile("Anmelden"),
	click: function(evt) {
		var form = document.getElementById("form_signIn");
		var email = form.email.value;
		var password = form.password.value;
		if(password.length != 0 && email.length != 0) {
			var user = Ember.Object.create({
				email: email,
				password: password
			});
			this.get("controller").send("login", user);
		} else {
			alert("Bitte Email und Password eingeben!");
		}
	}
});

App.AddMatchEventButton = Ember.View.extend({
	template: Ember.Handlebars.compile("<button>Speichern</button>"),
	click: function(evt) {
		console.log(this.get("controller").toString());
		this.get("controller").send("addMatchEvent");
	}
});

App.AddMatchButton = Ember.View.extend({
	template: Ember.Handlebars.compile("<button>Speichern</button>"),
	click: function(evt) {
		console.log(this.get("controller").toString());
		this.get("controller").send("addMatch");
	}
});

App.MySelect = Ember.Select.extend({
	classNames: ["mySelect"],
	valueDidChange: Ember.observer(function() {
		this._super();
		var value = this.get("value");
		console.log(value);
		this.get("controller").send("valueChanged", value);
	}, 'value')
});

App.ClubRadioButton = Ember.View.extend({
	title: "",
	checked: false,
	template: Ember.Handlebars.compile('<label class="radio"><input type="radio" name="club" {{bindAttr checked="view.checked"}}>{{view.title}}</label>'),
	click: function(evt) {
		var name = evt.target.name;
		this.get("controller").send("selectedClubChanged", this.get("title"));
	}
});

App.CreationRadioButton = Ember.View.extend({
	title: "",
	checked: false,
	option: "",
	template: Ember.Handlebars.compile('<label class="radio"><input type="radio" name="creation" {{bindAttr checked="view.checked"}}>{{view.title}}</label>'),
	click: function(evt) {
		this.get("controller").set("withAssist", this.get("option") == "assist");
	}
});

App.ScorerWithNumberCheckbox = Ember.Checkbox.extend({
	click: function(evt) {
		App.goal.set("scorer", null);
		App.goal.set("scorerNr", 0);
	}
});

App.AssistWithNumberCheckbox = Ember.Checkbox.extend({
	click: function(evt) {
		App.assist.set("assist", null);
		App.assist.set("assistNr", 0);
	}
});

App.PlayerNumberField = Ember.TextField.extend({
	type: "number",
	classNames: ["input_number"],
	attributeBindings: ["max", "min", "step"],
	min: "1",
	max: "99",
	step: "1",
	placeholder: "Nr"
});

App.ScorerField = Ember.View.extend({
	template: Ember.Handlebars.compile('' +
		'<svg version="1.1" id="fieldScorer" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="201" height="128px" viewBox="0 0 201 128" style="enable-background:new 0 0 201 128;" xml:space="preserve">' +
		'<g>' +
			'<rect id="left_Scorer" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickScorer(evt)" x="1" y="42.5" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" width="51" height="85"/>' +
			'<rect id="right_Scorer" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickScorer(evt)" x="150" y="42.5" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" width="51" height="85"/>' +
			'<g>' +
				'<rect id="corner_left_Scorer" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickScorer(evt)" x="1" y="0.5" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" width="51" height="42"/>' +
				'<path style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" d="M3.998,0.6C3.998,2.25,2.655,3.588,1,3.588"/>' +
			'</g>' +
			'<g>' +
				'<rect  id="corner_right_Scorer" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickScorer(evt)" x="150" y="0.5" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" width="51" height="42"/>' +
				'<path style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" d="M200.892,3.629c-1.656,0-3-1.352-2.999-3.018"/>' +
			'</g>' +
			'<g>' +
				'<path id="middle_Scorer" onmouseover="onMouseOverMiddleScorer(evt)" onmouseout="onMouseOutMiddleScorer(evt)" onclick="onClickMiddleScorer(evt)" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" d="M124.447,42.5c-4.286,9-13.086,14.248-23.247,14.248 S82.239,51.5,77.953,42.5H52v85h98v-85H124.447z M74.973,127.5c0-15,11.652-26.027,26.027-26.027 c14.374,0,26.027,11.027,26.027,26.027H74.973z"/>' +
				'<path id="penalty_area_circle_Scorer" onmouseover="onMouseOverMiddleScorer(evt)" onmouseout="onMouseOutMiddleScorer(evt)" onclick="onClickMiddleScorer(evt)" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" d="M101.1,56.813c10.142,0,18.924-5.313,23.201-14.313H77.9 C82.177,51.5,90.959,56.813,101.1,56.813z"/>' +
				'<path id="center_circle_Scorer" onmouseover="onMouseOverMiddleScorer(evt)" onmouseout="onMouseOutMiddleScorer(evt)" onclick="onClickMiddleScorer(evt)" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" d="M101,101.473c-14.375,0-26.027,11.027-26.027,26.027h52.054 C127.027,112.5,115.374,101.473,101,101.473z"/>' +
			'</g>' +
			'<g>' +
				'<polygon id="penalty_area_Scorer" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickScorer(evt)" points="52,0.5 78,0.5 78,15 124,15 124,0.5 150,0.5 150,42 52,42" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;"/>' +
				'<circle style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" cx="101" cy="28.765" r="0.201"/>' +
				'<rect id="six_yard_box_Scorer" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickScorer(evt)" x="78" y="0.5" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" width="46" height="15"/>' +
			'</g>' +
		'</g>' +
		'</svg>')
});
App.AssistField = Ember.View.extend({
	template: Ember.Handlebars.compile('' +
		'<svg version="1.1" id="fieldAssist" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="201" height="128px" viewBox="0 0 201 128" style="enable-background:new 0 0 201 128;" xml:space="preserve">' +
			'<g>' +
				'<rect id="left_Assist" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickAssist(evt)" x="1" y="42.5" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" width="51" height="85"/>' +
				'<rect id="right_Assist" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickAssist(evt)" x="150" y="42.5" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" width="51" height="85"/>' +
			'<g>' +
				'<rect id="corner_left_Assist" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickAssist(evt)" x="1" y="0.5" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" width="51" height="42"/>' +
				'<path style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" d="M3.998,0.6C3.998,2.25,2.655,3.588,1,3.588"/>' +
			'</g>' +
			'<g>' +
				'<rect  id="corner_right_Assist" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickAssist(evt)" x="150" y="0.5" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" width="51" height="42"/>' +
				'<path style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" d="M200.892,3.629c-1.656,0-3-1.352-2.999-3.018"/>' +
			'</g>' +
			'<g>' +
				'<path id="middle_Assist" onmouseover="onMouseOverMiddleAssist(evt)" onmouseout="onMouseOutMiddleAssist(evt)" onclick="onClickMiddleAssist(evt)" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" d="M124.447,42.5c-4.286,9-13.086,14.248-23.247,14.248 S82.239,51.5,77.953,42.5H52v85h98v-85H124.447z M74.973,127.5c0-15,11.652-26.027,26.027-26.027 c14.374,0,26.027,11.027,26.027,26.027H74.973z"/>' +
				'<path id="penalty_area_circle_Assist" onmouseover="onMouseOverMiddleAssist(evt)" onmouseout="onMouseOutMiddleAssist(evt)" onclick="onClickMiddleAssist(evt)" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" d="M101.1,56.813c10.142,0,18.924-5.313,23.201-14.313H77.9 C82.177,51.5,90.959,56.813,101.1,56.813z"/>' +
				'<path id="center_circle_Assist" onmouseover="onMouseOverMiddleAssist(evt)" onmouseout="onMouseOutMiddleAssist(evt)" onclick="onClickMiddleAssist(evt)" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" d="M101,101.473c-14.375,0-26.027,11.027-26.027,26.027h52.054 C127.027,112.5,115.374,101.473,101,101.473z"/>' +
			'</g>' +
			'<g>' +
				'<polygon id="penalty_area_Assist" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickAssist(evt)" points="52,0.5 78,0.5 78,15 124,15 124,0.5 150,0.5 150,42 52,42" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;"/>' +
				'<circle style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" cx="101" cy="28.765" r="0.201"/>' +
				'<rect id="six_yard_box_Assist" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickAssist(evt)" x="78" y="0.5" style="fill:#006837;stroke:#FFFFFF;stroke-miterlimit:10;" width="46" height="15"/>' +
			'</g>' +
			'</g>' +
		'</svg>')
});

App.GoalSegment = Ember.View.extend({
	template: Ember.Handlebars.compile('' +
		'<svg version="1.1" id="goalSegment" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"	width="198.5px" height="127px" viewBox="0 0 198.5 127" style="enable-background:new 0 0 198.5 127;" xml:space="preserve">' +
			'<polygon style="fill:#CCCCCC;stroke:#FFFFFF;stroke-miterlimit:10;" points="198.5,126.5 189.5,126.5 189.5,8.5 9.5,8.5 9.5,126.5 0.5,126.5 0.5,0.5 198.5,0.5 "/>' +
			'<rect id="upper_right" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickGoalSegment(evt)" x="129.5" y="8.5" style="fill:#E6E6E6;stroke:#FFFFFF;stroke-miterlimit:10;" width="60" height="59"/>' +
			'<rect id="upper_left" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickGoalSegment(evt)" x="9.5" y="8.5" style="fill:#E6E6E6;stroke:#FFFFFF;stroke-miterlimit:10;" width="60" height="59"/>' +
			'<rect id="upper_center" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickGoalSegment(evt)" x="69.5" y="8.5" style="fill:#E6E6E6;stroke:#FFFFFF;stroke-miterlimit:10;" width="60" height="59"/>' +
			'<rect id="lower_left" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickGoalSegment(evt)" x="9.5" y="67.5" style="fill:#E6E6E6;stroke:#FFFFFF;stroke-miterlimit:10;" width="60" height="59"/>' +
			'<rect id="lower_center" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickGoalSegment(evt)" x="69.5" y="67.5" style="fill:#E6E6E6;stroke:#FFFFFF;stroke-miterlimit:10;" width="60" height="59"/>' +
			'<rect id="lower_right" onmouseover="onMouseOver(evt)" onmouseout="onMouseOut(evt)" onclick="onClickGoalSegment(evt)" x="129.5" y="67.5" style="fill:#E6E6E6;stroke:#FFFFFF;stroke-miterlimit:10;" width="60" height="59"/>' +
		'</svg>')
});

App.Image = Ember.View.extend({
	tagName: "span",
	imageType: "",
	imageURL: function() {
		console.log(this.get("imageType"));
		var path = "images/" + this.get("imageType") + ".png";
		console.log(path);
		return path;
	}.property(),
	template: Ember.Handlebars.compile('<img {{bindAttr src="view.imageURL"}}>')
});

DragNDrop = Ember.Namespace.create();

DragNDrop.cancel = function(event) {
	event.preventDefault();
	return false;
};

DragNDrop.Draggable = Ember.Mixin.create({
	classNames: ["cursor-hand"],
	attributeBindings: 'draggable',
	draggable: 'true',
	dragStart: function(event) {
		var dataTransfer = event.originalEvent.dataTransfer;
		var id = this.get('elementId');
		dataTransfer.setData('Text', id);
	}
});

DragNDrop.Droppable = Ember.Mixin.create({
	drop: function(event) {
		event.preventDefault();
		return false;
	},
	dragEnter: DragNDrop.cancel,
	dragOver: DragNDrop.cancel
});

App.PlayerView = Ember.View.extend({
	template: Ember.Handlebars.compile("{{view.content.firstName}} {{view.content.lastName}}, {{view.content.age}}"),
	tagName: "li",
	classNames: ["listPlayer"]
});

App.PlayerViewExtended = Ember.View.extend({
	templateName: "playerListElement",
	tagName: "li",
	classNames: ["listPlayer"]
});

App.PlayerViewDraggable = App.PlayerView.extend(DragNDrop.Draggable, {
	// .setDragImage (in #dragStart) requires an HTML element as the first argument
	// so you must tell Ember to create the view and it's element and then get the
	// HTML representation of that element.
	dragIconElement: Ember.View.create({
		attributeBindings: ['src'],
		tagName: 'img',
		src: 'images/PlayerAdd.png'
	}),
	dragStart: function(event) {
		this._super(event);
		// Let the controller know this view is dragging
		this.set('content.isDragging', true);

		// Set the drag image and location relative to the mouse/touch event
		//var dataTransfer = event.originalEvent.dataTransfer;
		//dataTransfer.setDragImage(this.get('dragIconElement'), 24, 24);
	},
	dragEnd: function(event) {
		// Let the controller know this view is done dragging
		this.set('content.isDragging', false);
	}
});

App.PlayerList = Ember.CollectionView.extend({
	tagName: 'div',
	classNames: ['dropTarget', "listBox"],
	itemViewClass: App.PlayerView.extend(),
	emptyView: Ember.View.extend({
		template: Ember.Handlebars.compile("The collection is empty")
	}),
	dropBase: function(player) {
		Ember.run.next(this, function() {
			var teamsOfPlayer = player.get("teams");

			var id = this.get("controller.selectedTeamId");
			var team = App.Team.find(id);

			if (!teamsOfPlayer.contains(team)) {
				this.get("controller").propertyWillChange("content");
				teamsOfPlayer.pushObject(team);
				this.get("controller").propertyDidChange("content");
			} else if (teamsOfPlayer.contains(team)) {
				this.get("controller").propertyWillChange("content");
				teamsOfPlayer.removeObject(App.Team.find(id));
				this.get("controller").propertyDidChange("content");
			}
		});
	}
});

App.PlayerListExtended = App.PlayerList.extend({
	itemViewClass: App.PlayerViewExtended.extend()
});

App.PlayerListClub = App.PlayerList.extend(DragNDrop.Droppable, {
	itemViewClass: App.PlayerViewDraggable.extend(),
	drop: function(event) {
		var clubPlayerList = this.get("controller.clubPlayerList");
		var viewId = event.originalEvent.dataTransfer.getData('Text'),
			view = Ember.View.views[viewId];
		var player = view.get("content");
		if(!clubPlayerList.contains(player)) {
			this.dropBase(player);
		}

		return this._super(event);
	}
});

App.PlayerListTeam = App.PlayerList.extend(DragNDrop.Droppable, {
	itemViewClass: App.PlayerViewDraggable.extend(),
	drop: function(event) {
		var teamPlayerList = this.get("controller.teamPlayerList");
		var viewId = event.originalEvent.dataTransfer.getData('Text'),
			view = Ember.View.views[viewId];
		var player = view.get("content");
		if(!teamPlayerList.contains(player)) {
			this.dropBase(player);
		}

		return this._super(event);
	}
});

App.DateField = Ember.TextField.extend({
	type: "date"
	/*didInsertElement: function() {
		this.datepicker.on("changeDate", function() {
			this.trigger("change");
		});
	}*/
});