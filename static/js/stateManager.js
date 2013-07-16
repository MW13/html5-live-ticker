/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 16.05.13
 * Time: 13:01
 * To change this template use File | Settings | File Templates.
 */
var userManager = Ember.StateManager.create({
	enableLogging: true,
	initialState: "loggedOut",
	loggedOut: Ember.State.create({
		enter: function (stateManager) {
			console.log("entering the loggedOut state.")
		}
	}),
	loggedIn: Ember.State.create({
		enter: function (stateManager) {
			console.log("entering the loggedIn state.");
		}
	})
});