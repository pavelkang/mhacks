var loginApp = angular.module('loginApp', []);

loginApp.controller('loginCtrl', function($scope, $http){
    $scope.form = {
        username : "",
        password : "",
        valid : false
    };
    $scope.submit = function() {
        if (validate($scope.form)) {
            $http.post('/api/login', $scope.form)
                .success(function(data){
                    if (data.idt==="data") {
                        alert("Login successful!");
                        if ($scope.form.role=="stu") { // is student
                            window.location.href = "/student#/?username="+$scope.form.username;
                        } else { // is employer
                            window.location.href = "/employer#/?username="+$scope.form.username;
                        }
                    } else { // error
                        alert(data.error);
                    }
                });
        }
    };
});p

var validate = function(form) {
    if ((!form.username)||(!form.password)) {
        alert("Login information not complete!");
        return false;
    }
    return true;
}
