// www/js/controllers/login.js
'use strict';

angular.module('down')
	.controller('LoginCtrl', ['$scope', '$http', '$location', '$rootScope', '$ionicPopup', '$ionicLoading',
		function($scope, $http, $rootScope, $location, $ionicPopup, $ionicLoading) {
			console.log('Login working!');

		$scope.submitLogin = function() {

			if (typeof $scope.password === 'undefined' || typeof $scope.number === 'undefined') {
				var alert = $ionicPopup.alert({
					title: 'Please enter your number and password!',
					template: 'You can\'t leave either field empty.'
				});
				alert.then(function(res) {
					console.log('Password not entered!');
				});
				return;
			}

			var credentials = {
				number: $scope.number,
				password: $scope.passwords
			};

			console.log(credentials);

			// $http
			// 	.post('/login', credentials)
			// 	.success(function(data, status, headers, config) {
			// 		if (!data.status) {
			// 			var alert = $ionicPopup.alert({
			// 				title: 'Wrong number or password!',
			// 				template: 'Please ensure you entered your correct credentials.'
			// 			});
			// 			alert.then(function(res) {
			// 				console.log('Wrong credentials entered!');
			// 			})
			// 		}
			// 	});
		}
	}]);