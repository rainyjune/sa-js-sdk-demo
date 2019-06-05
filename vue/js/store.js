(function (exports) {
	'use strict';

	var storage = exports.localStorage;

	exports.todoStorage = {
		getTodos : function () {
			return storage['todos'] ? JSON.parse(storage['todos']) : [];
		},
		saveTodos: function (todos) {
			storage['todos'] = JSON.stringify(todos);
		}
	}


})(window)

