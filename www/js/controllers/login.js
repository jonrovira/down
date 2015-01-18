// www/js/controllers/login.js
'use strict';

angular.module('down')
	.controller('LoginCtrl', ['$scope', '$http', '$rootScope', '$ionicPopup', '$ionicLoading', '$location',
		function($scope, $http, $rootScope, $ionicPopup, $ionicLoading, $location) {
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
				password: $scope.password
			};

			$http
				.post('https://afternoon-fjord-7983.herokuapp.com/login', credentials)
				.success(function(data, status, headers, config) {
					$ionicLoading.hide();
					if (data.status !== 'success') {
						var alert = $ionicPopup.alert({
							title: data.token,
							template: 'Please ensure you entered your correct credentials.'
						});
						alert.then(function(res) {
							console.log('Wrong credentials entered!');
						})
						return;
					}
					// store token in local storage
					window.localStorage.setItem('token', data.token);
					console.log('Successfully logged in!');
					// redirect user to main page
					$location.path('/');
					return;
				});
		}
	}]);