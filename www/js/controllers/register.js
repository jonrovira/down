// www/js/controllers/register.js
'use strict';

angular.module('down')
	.controller('RegisterCtrl', ['$scope', '$http', '$rootScope', '$ionicPopup', '$ionicLoading', '$location',
		function($scope, $http, $rootScope, $ionicPopup, $ionicLoading, $location) {
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
				// $ionicLoading.show({
				// 	template: 'Please wait...'
				// });
				var newUser = {
					firstName: $scope.firstName,
					lastName: $scope.lastName,
					number: $scope.number,
					password: $scope.password
				};

				$http
					.post('https://afternoon-fjord-7983.herokuapp.com/register', newUser)
					.success(function(data, status, headers, config) {
						if (data.status !== 'success') {
							$ionicLoading.hide();
							var errorPopup = $ionicPopup.alert({
								title: 'Error signing up!',
								template: 'Please retry.'
							});
							alertPopup.then(function(res) {
								console.log('Register error occurred!');
							});
							return;
						}
						$ionicLoading.hide();
						window.localStorage.setItem('token', data.token);
						console.log('Successfully registered');
						$rootScope = newUser;
						$location.path('/');
					});
			 }
			
	}]);