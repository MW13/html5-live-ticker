/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 19.04.13
 * Time: 13:28
 * To change this template use File | Settings | File Templates.
 */
App.MainButton = Ember.View.extend({
	click: function(event) {
		console.log(event.valueOf());
		alert("funktioniert");
		this.get('controller').send('changeSite', "matchOverview");
	}
});
/*
App.MatchList = Ember.CollectionView.create({
	classNames: "matchlist",
	contentBinding: "App.MatchController",
	//classNames: ['nothing'],
	//content: [App.Match.create()],
	emptyView: Ember.View.extend({
		template: Ember.Handlebars.compile("Keine Spiele")
	}),
	itemViewClass: Ember.View.extend({
		template: Ember.Handlebars.compile("<table class='match'><tr><td align='left'>{{view.content.teamHome}}</td><td style='width: 10px;'>-</td><td align='right'>{{view.content.teamAway}}</td></tr>" +
																"<tr><td align='right'><h1>{{view.content.goalsHome}}</h1></td><td style='width: 10px;'><h1>:</h1></td><td align='left'><h1>{{view.content.goalsAway}}</h1></td></tr>" +
																"<tr><td align='left'>{{view.content.kickoff}}</td><td style='width: 100px;'>{{view.content.teamGroup}}</td><td align='right'>{{view.content.kickoff}}</td></tr></tr></table>")
	})
	//itemViewClass: App.MatchView.extend({})
});
*/
//App.MatchList.appendTo("");
App.FirstTabView = Ember.View.extend({templateName: "firstTab"});
App.SecondTabView = Ember.View.extend({templateName: "secondTab"});