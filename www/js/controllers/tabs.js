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
			};

			// format the array of names so that it can be rendered correctly by the template engine
			var formatNamesArray = function(array) {
				var result = [];
				for (var i = 0; i < array.length; i++) {
					result.push(array[i].first_name + ' ' + array[i].last_name);
				}
				return result;
			};

			// send a HTTP GET request to obtain the members of a group, given the groups array ($scope.groups) and an index into the array
			var getFriendList = function(groups, index) {
				// get group ID from the array of groups
				var g_id = groups[index]._id.$oid;
				// get friends in a certain group given a group ID
				$http
					.get('https://afternoon-fjord-7983.herokuapp.com/members?group_id=' + g_id)
					.success(function(data, status, headers, configs) {
						// console.log(data);
						if (!data) {
							console.log('Error status: ' + data.status);
						} else {
							console.log(formatNamesArray(data.members));
							var formattedNames = formatNamesArray(data.members);
							$scope.friends = formattedNames;
							// no need for return since $scope.friends is being set by this function
							//return formattedNames;
						}
					});

			};

			// get all groups of a certain user, given a user ID
			$http
				.get('https://afternoon-fjord-7983.herokuapp.com/groups?user_id=' + id)
				.success(function(data, status, headers, config) {
					console.log(data);
					if (!data) {
						console.log('Error occurred: ' + data.status);
					} else {
						$scope.groups = data.groups;
						// current group = first group by default
						$scope.currentGroup = data.groups[0];
						getFriendList(data.groups, 0);
						$scope.activeTabs = createTabArray(data.groups.length);
					}
				});

			// function called whenever a tab is clicked
			$scope.toggleClass = function(num) {
				$scope.currentGroup = $scope.groups[num];
				for (var i = 0; i < $scope.activeTabs.length; i++) {
					if (i !== num) {
						$scope.activeTabs[i] = '';
					} else {
						$scope.activeTabs[i] = 'active';
					}
				}
				getFriendList($scope.groups, num);				
			}
	}]);
