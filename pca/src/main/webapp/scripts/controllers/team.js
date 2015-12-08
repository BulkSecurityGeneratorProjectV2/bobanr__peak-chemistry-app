/**
 * 
 */
'use strict';

pcaApp.controller('TeamsController', ['$scope','$routeParams','$rootScope','$translate', 'TeamService',
        function($scope, $routeParams,$rootScope,$translate, TeamService){
			$scope.currentPage = 1;
			$scope.itemsPerPage = 10;
			$scope.maxSize = 15;
			// pagination
			$scope.loadPage = function() {
				TeamService.paged({
					page : $scope.currentPage,
					count : $scope.itemsPerPage
				}, function(response) {
					$scope.teams = response.content;
					$scope.totalItems = response.totalElements;
				});
			};
		
			$scope.loadPage();
		
			$scope.pageChanged = function() {
				$scope.loadPage();
			};
			// pagination ends
		}	
]);

pcaApp.controller('TeamController', ['$scope','$routeParams','$rootScope','$translate', 'TeamService',
                                      function($scope, $routeParams,$rootScope,$translate, TeamService){
		if ($routeParams.id) {
			$scope.id = $routeParams.id;
			$scope.team = TeamService
					.get(
							{
								id : $routeParams.id
							},
							function() {
								var a = 1;
							});
		} 		
		$scope.success = null;
	    $scope.error = null;   
	    
	    $scope.saveTeam = function () {
	    	TeamService.save($scope.team,
	                function (value, responseHeaders) {
	                    $scope.error = null;
	                    $scope.success = 'OK';
	                    $scope.team = value;
	                },
	                function (httpResponse) {
	                    $scope.success = null;
	                    if (httpResponse.status === 304 &&
	                            httpResponse.data.error && httpResponse.data.error === "Not Modified") {
	                        $scope.error = null;
	                    } else {
	                        $scope.error = "ERROR";
	                    }
	                });
	    };   
	}	
]);