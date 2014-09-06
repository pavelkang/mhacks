var stuApp = angular.module('stuApp', []);

stuApp.controller('stuCtrl', function($scope){
    $scope.form = {
        choice : 0,
        input : ""
    }
    $scope.test = "stu";
})
