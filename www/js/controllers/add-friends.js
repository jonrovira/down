// www/js/controllers/invite.js
'use strict';

var createNameArray = function(array) {
	var nameArray = [];
	for (var i = 0; i < array.length; i++) {
		nameArray.push(array[i].firstName + ' ' + array[i].secondName);
	}
};

angular.module('down')
	.controller('AddFriendsCtrl', ['$scope', '$http', '$location', '$rootScope',
		function($scope, $http, $rootScope, $location) {
			// send get request to get array of all users who aren't friends with this users
			var id = window.localStorage.getItem('token');
			$http
				.get('/users', id)
				.success(function(data, status, headers, config) {
					$scope.users = createNameArray(data.users);
				});

	}]);