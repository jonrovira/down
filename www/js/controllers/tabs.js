// www/js/controllers/tabs.js
'use strict';

angular.module('down')
	.controller('TabsCtrl', ['$scope', '$http', '$location', '$rootScope',
		function($scope, $http, $rootScope, $location) {
			// on page load, we need to get the list of groups and render them onto the main page
			var id = window.localStorage.getItem('token');
			var createTabArray = function(size) {
				var result = [];
				// set first tab as active by default
				result[0] = 'active';
				// set others as empty string (no class)
				for (var i = 1; i < size; i++) {
					result[i] = '';
				}
				return result;
			}


			$http
				.get('https://afternoon-fjord-7983.herokuapp.com/groups?user_id=' + id)
				.success(function(data, status, headers, config) {
					console.log(data);
					if (!data) {
						console.log('Error occurred: ' + data.status);
					} else {
						$scope.groups = data.groups;
						$scope.activeTabs = createTabArray(data.groups.length);
					}
				});

			// $scope.activeTabs = ['', '', '', 'active', '', '', ''];

			// function called whenever a tab is clicked
			$scope.toggleClass = function(num) {
				for (var i = 0; i < $scope.activeTabs.length; i++) {
					if (i !== num) {
						$scope.activeTabs[i] = '';
					} else {
						$scope.activeTabs[i] = 'active';
					}
				}

				// get friends in a certain group
				$http
					.get('https://afternoon-fjord-7983.herokuapp.com/')
					.success(function(data, status, headers, configs) {
						if (data.status !== 'success') {
							console.log('Error status: ' + data.status);
						} else {
							$scope.friends = data.friends;
						}
					});

			}
	}]);
