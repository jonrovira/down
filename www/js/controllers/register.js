// www/js/controllers/signup.js
'use strict';

angular.module('down')
	.controller('RegisterCtrl', ['$scope', '$http', '$rootScope', '$ionicLoading', '$ionicPopup',
		function($scope, $http, $rootScope, $location, $ionicLoading, $ionicPopup) {
			console.log('Registering user now!');
			
			$scope.submitRegister = function() {

				// show error message if passwords do not match
				if ($scope.password !== $scope.passwordConfirm) {
					var alertPopup = $ionicPopup.alert({
						title: 'Passwords don\'t match!',
						template: 'Please make sure the passwords you entered are the same.'
					});
					alertPopup.then(function(res) {
						console.log('Passwords do not match!');
					});
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
				$http
					.post('/register', newUser)
					.success(function(data, status, headers, config) {
						if (!data.status) {
							$ionicLoading.hide();
							var errorPopup = $ionicPopup.alert({
								title: 'Error signing up!',
								template: 'Please retry.'
							});
							alertPopup.then(function(res) {
								console.log('Register error occurred!');
							});
						}
						window.localStorage.setItem('token', data.token);
						console.log('Successfully registered');
						$ionicLoading.hide();
					$rootScope = newUser;
					});
			}
			
	}]);