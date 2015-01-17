// www/js/controllers/signup.js
'use strict';

angular.module('down')
	.controller('RegisterCtrl', ['$scope', '$http', '$location', '$rootScope', '$ionicPopup', '$ionicLoading',
		function($scope, $http, $rootScope, $location, $ionicPopup, $ionicLoading) {
			console.log('Registering user now!');
			
			$scope.submitRegister = function() {

				// show error message if passwords do not match
				if ($scope.password !== $scope.passwordConfirm) {
					var alert = $ionicPopup.alert({
						title: 'Passwords don\'t match!',
						template: 'Please make sure the passwords you entered are the same.'
					});
					alert.then(function(res) {
						console.log('Passwords not matched!');
					})
					return;
				}
				$ionicLoading.show({
					template: 'Please wait...'
				});
				var newUser = {
					firstName: $scope.firstName,
					lastName: $scope.lastName,
					number: $scope.number,
					password: $scope.password
				}
				// $http
				// 	.post('/register', newUser)
				// 	.success(function(data, status, headers, config) {
				// 		if (!data.status) {
				// 			$ionicLoading.hide();
				// 			// var errorPopup = $ionicPopup.alert({
				// 			// 	title: 'Error signing up!',
				// 			// 	template: 'Please retry.'
				// 			// });
				// 			// alertPopup.then(function(res) {
				// 			// 	console.log('Register error occurred!');
				// 			// });
				// 		}
				// 		window.localStorage.setItem('token', data.token);
				// 		console.log('Successfully registered');
				// 		$rootScope = newUser;
				// 	});
				console.log(newUser);
				$ionicLoading.hide();
			}
			
	}]);