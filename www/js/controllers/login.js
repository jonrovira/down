// www/js/controllers/login.js
'use strict';

angular.module('down')
	.controller('LoginCtrl', ['$scope', '$http', '$location', '$rootScope', '$ionicPopup', '$ionicLoading',
		function($scope, $http, $rootScope, $location, $ionicPopup, $ionicLoading) {
			console.log('Login working!');

		$scope.submitLogin = function() {

			if (typeof $scope.number === 'undefined' || typeof $scope.password === 'undefined') {
				var alert = $ionicPopup.alert({
					title: 'Please enter your number and password!',
					template: 'You can\'t leave either field empty.'
				});
				alert.then(function(res) {
					console.log('Password not entered!');
				});
				return;
			}

			$ionicLoading.show({
				template: 'Please wait...'
			});
			var credentials = {
				number: $scope.number,
				password: $scope.passwords
			};

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

			setTimeout(function() {
				console.log(credentials);
				$ionicLoading.hide();	
			}, 1000)
			// console.log(credentials);
			// $ionicLoading.hide();

		}
	}]);