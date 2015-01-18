// www/js/controllers/content.js

angular.module('down')
	.controller('ContentController', ['$scope', '$http', '$location', '$rootScope', 
		function($scope, $http, $location, $rootScope) {
			// controller for right side menu
			function ContentController($scope, $ionicSideMenuDelegate) {
				$scope.toggleLeft = function() {
					$ionicSideMenuDelegate.toggleLeft();
				};
			}

			function logout() {
				window.localStorage.removeItem('token');
				$location.path('/login');
			};
		}]);

