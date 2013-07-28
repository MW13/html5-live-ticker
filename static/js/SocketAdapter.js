/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 14.05.13
 * Time: 22:03
 * To change this template use File | Settings | File Templates.
 */
TYPES = {
	CREATE: "CREATE",
	UPDATE: "UPDATE",
	INCREMENT_MINUTE: "INCREMENT_MINUTE",
	DELETE: "DELETE",
	FIND: "FIND",
	FIND_MANY: "FIND_MANY",
	FIND_QUERY: "FIND_QUERY",
	FIND_ALL: "FIND_ALL"
};

var ws;

App.SocketAdapter = DS.RESTAdapter.extend({
	plurals: {
		'club': 'clubs',
		'match': 'matches',
		'team': 'teams'
	},
	serializer: DS.RESTSerializer.extend({
		serializeId: function (id) {
			return id.toString();
		},
		primaryKey: function (type) {
			return '_id';
		}
	}),
	socket: void 0,
	requests: void 0,
	generateUuid: function () {
		var S4;
		S4 = function () {
			return Math.floor(Math.random() * 0x10000).toString(16);
		};
		return S4() + S4();
	},
	init: function () {
		var context;
		this._super();
		context = this;
		this.set("requests", {});
		ws = io.connect("//" + location.host);
		window.reqs = this.get('requests');
		ws.on("ember-data", function (payload) {
			var request, uuid;
			uuid = payload.uuid;
			request = context.get("requests")[uuid];
			if (request && payload.data) {
				return request.callback(request, payload.data);
			}
		});
		ws.on("loginResponse", function (payload) {
			var user = payload;
			var controller = App.__container__.lookup("controller:Login");
			controller.transitionToRoute("index");
			return App.store.load(App.User, user);
		});
		ws.on("update", function (payload) {
			var minute = payload.data.match.minute;
			console.log("Minute: " + minute + " - " + payload.data.match["_id"]);

			var match = App.Match.find(payload.data.match["_id"]);
			Ember.run(this, function () {
				match.reload();
			});
		});
		ws.on("disconnect", function () {
		});
		return this.set("socket", ws);
	},
	send: function (request) {
		var data;
		request.uuid = this.generateUuid();
		request.context = this;
		this.get("requests")[request.uuid] = request;
		data = {
			uuid: request.uuid,
			action: request.requestType,
			type: this.rootForType(request.type)
		};
		if (request.record !== void 0) {
			data.record = this.serialize(request.record, {
				includeId: true
			});
		}
		if (request.id !== void 0) {
			data.id = request.id;
		}
		if (request.query !== void 0) {
			data.query = request.query;
		}
		if (request.ids !== void 0) {
			data.ids = request.ids;
		}
		return this.socket.emit("ember-data", data);
	},
	createRecord: function (store, type, record) {
		return this.send({
			store: store,
			type: type,
			record: record,
			requestType: TYPES.CREATE,
			callback: function (req, res) {
				return Ember.run(req.context, function () {
					return this.didCreateRecord(req.store, req.type, req.record, res);
				});
			}
		});
	},
	updateRecord: function (store, type, record) {
		return this.send({
			store: store,
			type: type,
			record: record,
			requestType: TYPES.UPDATE,
			callback: function (req, res) {
				return Ember.run(req.context, function () {
					return this.didUpdateRecord(req.store, req.type, req.record, res);
				});
			}
		});
	},
	incrementMinute: function (store, type, record) {
		return this.send({
			store: store,
			type: type,
			record: record,
			requestType: TYPES.INCREMENT_MINUTE,
			callback: function (req, res) {
				return Ember.run(req.context, function () {
					//return this.didUpdateRecord(req.store, req.type, req.record, res);
				});
			}
		});
	},
	deleteRecord: function (store, type, record) {
		return this.send({
			store: store,
			type: type,
			record: record,
			requestType: TYPES.DELETE,
			callback: function (req, res) {
				return Ember.run(req.context, function () {
					return this.didDeleteRecord(req.store, req.type, req.record);
				});
			}
		});
	},
	find: function (store, type, id) {
		return this.send({
			store: store,
			type: type,
			id: id,
			requestType: TYPES.FIND,
			callback: function (req, res) {
				return Ember.run(req.context, function () {
					return this.didFindRecord(req.store, req.type, res, req.id);
				});
			}
		});
	},
	findAll: function (store, type, since) {
		return this.send({
			store: store,
			type: type,
			since: this.sinceQuery(since),
			requestType: TYPES.FIND_ALL,
			callback: function (req, res) {
				return Ember.run(req.context, function () {
					return this.didFindAll(req.store, req.type, res);
				});
			}
		});
	},
	findQuery: function (store, type, query, recordArray) {
		return this.send({
			store: store,
			type: type,
			query: query,
			recordArray: recordArray,
			requestType: TYPES.FIND_QUERY,
			callback: function (req, res) {
				return Ember.run(req.context, function () {
					return this.didFindQuery(req.store, req.type, res, req.recordArray);
				});
			}
		});
	},
	findMany: function (store, type, ids, owner) {
		return this.send({
			store: store,
			type: type,
			ids: this.serializeIds(ids),
			owner: owner,
			requestType: TYPES.FIND_MANY,
			callback: function (req, res) {
				return Ember.run(req.context, function () {
					return this.didFindMany(req.store, req.type, res);
				});
			}
		});
	},
	serializeIds: function (ids) {
		var serializer = Ember.get(this, 'serializer');

		return Ember.EnumerableUtils.map(ids, function (id) {
			return serializer.serializeId(id);
		});
	},
	rootForType: function (type) {
		var serializer = Ember.get(this, 'serializer');
		return serializer.rootForType(type);
	},
	pluralize: function (string) {
		var serializer = Ember.get(this, 'serializer');
		return serializer.pluralize(string);
	},
	sinceQuery: function (since) {
		var query = {};
		query[Ember.get(this, 'since')] = since;
		return since ? query : null;
	}
});