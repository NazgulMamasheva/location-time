LocationTime = new Mongo.Collection("location-time");

if(Meteor.isClient) {
	angular.module("app", ["angular-meteor"])
		.controller("ctrl", ["$scope", "$meteor",
			function ($scope, $meteor) {
				$scope.location_time= $meteor.collection(LocationTime);
				$scope.isEdit = false;
				$scope.indexOfElement = null;

				$scope.save = function () {
					if (!$scope.isEdit) {
						$scope.location_time.push({
							location: $scope.input_location,
							time_zone: $scope.input_time_zone
						});
					}
					else {
						$scope.location_time[$scope.indexOfElement].location = $scope.input_location;
						$scope.location_time[$scope.indexOfElement].time_zone = $scope.input_time_zone;

						$scope.isEdit = false;
						$scope.indexOfElement = null;
					}

					$scope.input_location = "";
					$scope.input_time_zone = "";
					
					$scope.location_time_form.$setPristine();
				};
				
				$scope.edit = function (x) {
					$scope.isEdit = true;
					$scope.indexOfElement = $scope.location_time.indexOf(x);

					$scope.input_location = x.location;
					$scope.input_time_zone = x.time_zone;
				};
				
				$scope.remove = function (x) {
					$scope.location_time.splice($scope.location_time.indexOf(x), 1);
				};

				$scope.convert_to_time = function(x) {
					$scope.array = x.split(':');
					if($scope.array[0] < 0 || $scope.array[0] == -0) $scope.array[1] *= -1;
					var now = new Date();
					var utc = new Date(now.getUTCFullYear(),
									   now.getUTCMonth(),
									   now.getUTCDate(), 
									   now.getUTCHours(),
									   now.getUTCMinutes(),
									   now.getSeconds());
					return  utc.getTime() + $scope.array[0]*3600000 + $scope.array[1]*60000;
				};
			}
		])
}