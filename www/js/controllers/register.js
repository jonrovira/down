// www/js/controllers/register.js
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
				};

				// $http({
				// 	method: 'POST',
				// 	url: 'https://afternoon-fjord-7983.herokuapp.com/register',
				// 	data: newUser,
				// 	headers: {
				// 		'Access-Control-Allow-Origin': '*',
    //             		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    //             		'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
				// 		}
				// 	})
				// 	.success(function(data, status, headers, config) {
				// 		console.log(data);
				// 		if (data.status !== 'success') {
				// 			$ionicLoading.hide();
				// 			var errorPopup = $ionicPopup.alert({
				// 				title: 'Error signing up!',
				// 				template: 'Please retry.'
				// 			});
				// 			alertPopup.then(function(res) {
				// 				console.log('Register error occurred!');
				// 			});
				// 		}
				// 		console.log(data.token);
				// 		window.localStorage.setItem('token', data.token);
				// 		console.log('Successfully registered');
				// 		$rootScope = newUser;
				// 		$ionicLoading.hide();
				// 		$location.path('/');
				// 	});

					
				console.log(newUser);
				$http
					.post('https://afternoon-fjord-7983.herokuapp.com/register', newUser)
					.success(function(data, status, headers, config) {
						console.log(data);
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
						console.log(data.token);
						window.localStorage.setItem('token', data.token);
						console.log('Successfully registered');
						$rootScope = newUser;
						$ionicLoading.hide();
						$location.path('/');
					});
			 }
			
	}]);