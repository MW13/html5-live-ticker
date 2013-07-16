/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 08.05.13
 * Time: 19:21
 * To change this template use File | Settings | File Templates.
 */
/*App = Ember.Application.create({
 LOG_TRANSITIONS: true
 });

 App.Router.map(function() {
 this.resource("tables", function() {
 this.resource("table", {path: ":table_id"});
 })
 });

 App.IndexRoute = Ember.Route.extend({
 redirect: function() {
 this.transitionTo('tables');
 }
 });

 App.ApplicationRoute = Ember.Route.extend({
 setupController: function() {
 this.controllerFor("food").set("model", App.Food.find());
 }
 });

 App.TablesRoute = Ember.Route.extend({
 model: function() {
 return App.Table.find();
 }
 });

 App.TableRoute = Ember.Route.extend({
 setupController: function(model) {
 this.controllerFor('tables').set('selectedTable', model);
 }
 });

 App.TablesController = Ember.ArrayController.extend({
 sortProperties: ['id']
 });

 App.FoodController = Ember.ArrayController.extend({
 needs: ['tables'],
 tableBinding: 'controllers.tables.selectedTable'
 });
 */