var stuApp = angular.module('stuApp', []);

stuApp.controller('stuCtrl', function($scope, $http){
    $scope.form = {
        choice : 0,
        input : ""
    };
})
