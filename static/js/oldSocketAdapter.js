/**
 * Created with IntelliJ IDEA.
 * User: Markus
 * Date: 14.05.13
 * Time: 22:50
 * To change this template use File | Settings | File Templates.
 */
DS.SocketAdapter = DS.RESTAdapter.extend({
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
		var context, ws;
		this._super();
		context = this;
		this.set("requests", {});
		ws = io.connect("//" + location.host);
		window.reqs = this.get('requests');
		ws.on("ember-data", function (payload) {
			var request, uuid;
			uuid = payload.uuid;
			request = context.get("requests")[uuid];
			if (payload.data) {
				return request.callback(request, payload.data);
			}
		});
		ws.on("delete", function (payload) {
			var box, boxId;
			boxId = payload.data['box'].id;
			box = App.store.find(App.Box, boxId);
			return App.store.unloadRecord(box);
		});
		ws.on("create", function (payload) {
			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! " + payload);
			window.pay = payload;
			return App.store.load(App.Box, payload.data[payload.type]);
		});
		ws.on("update", function (payload) {
			return App.store.load(App.Box, payload.data[payload.type]);
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
	createRecords: function (store, type, records) {
		return this.send({
			store: store,
			type: type,
			records: records,
			requestType: TYPES.CREATES,
			callback: function (req, res) {
				return Ember.run(req.context, function () {
					return this.didCreateRecords(req.store, req.type, req.records, res);
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
	updateRecords: function (store, type, records) {
		return this.send({
			store: store,
			type: type,
			records: records,
			requestType: TYPES.UPDATES,
			callback: function (req, res) {
				return Ember.run(req.context, function () {
					return this.didUpdateRecords(req.store, req.type, req.records, res);
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
	deleteRecords: function (store, type, records) {
		return this.send({
			store: store,
			type: type,
			records: records,
			requestType: TYPES.DELETES,
			callback: function (req, res) {
				return Ember.run(req.context, function () {
					return this.didDeleteRecords(req.store, req.type, req.records, res);
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
			callback: function (req, res) {
				return Ember.run(req.context, function () {
					return this.didFindMany(req.store, req.type, res);
				});
			}
		});
	},
	serializeIds: function(ids) {
		var serializer = get(this, 'serializer');

		return Ember.EnumerableUtils.map(ids, function(id) {
			return serializer.serializeId(id);
		});
	},
	rootForType: function(type) {
		var serializer = get(this, 'serializer');
		return serializer.rootForType(type);
	},
	pluralize: function(string) {
		var serializer = get(this, 'serializer');
		return serializer.pluralize(string);
	},
	sinceQuery: function(since) {
		var query = {};
		query[get(this, 'since')] = since;
		return since ? query : null;
	}
});