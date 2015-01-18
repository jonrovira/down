// www/js/controllers/invite.js
'use strict';

angular.module('down')
	.controller('AddFriendsCtrl', ['$scope', '$http', '$location', '$rootScope', '$ionicListDelegate',
		function($scope, $http, $rootScope, $location, $ionicListDelegate) {
			// send get request to get array of all users who aren't friends with this users
			var id = window.localStorage.getItem('token');
			var userArray;
			// helper function that concatenates first names and last names as required for the view
			var createNameArray = function(array) {
				var nameArray = [];
				for (var i = 0; i < array.length; i++) {
					nameArray.push(array[i].first_name + ' ' + array[i].last_name);
				}
				return nameArray;
			};
			$http
				.get('https://afternoon-fjord-7983.herokuapp.com/possiblefriends?user_id=' + id)
				.success(function(data, status, headers, config) {
					// return array of friends
					userArray = data.users;
					// clean up the names to be rendered on the view
					$scope.names = createNameArray(userArray);
					console.log($scope.names);
				});

	}]);