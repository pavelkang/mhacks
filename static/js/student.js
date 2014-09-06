var stuApp = angular.module('stuApp', []);
// factory goes here


stuApp.controller('stuCtrl', function($scope, $http){
    $scope.mp3source = "../static/audio/canon.mp3";
    $scope.form = {
        choice : 0,
        input : "",
        type : -1,
        ID : -1
    };
    $scope.submit = function() {
        if (validate($scope.form)) {
            // http request here
        }
    }
});

var validate = function(form) {
    if (type==0) { // choice question
    } else { // input question
        if (input==="") {
            alert("Not valid!");
            return false;
        }
    }
    return true;
}
