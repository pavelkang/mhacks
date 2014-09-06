var loginApp = angular.module('loginApp', []);

loginApp.factory("loginFactory", function($http, $q){
    return {
        sendForm : function(form) {
            var deferred = $q.defer();
            $http.post('/api/login', form)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(err) {
                    deferred.reject("Code validation failed!");
                });
            return deferred.promise;
        }
    }
});

loginApp.controller('loginCtrl', function(loginFactory, $scope, $http){
    $scope.form = {
        username : "",
        password : "",
        valid : false
    };
    $scope.submit = function() {
        if (validate($scope.form)) {
            loginFactory.sendForm(form).then(function(data){
                if (data.idt==="error") {
                    alert(data.error);
                } else {
                    alert ("Login successful!");
                        if ($scope.form.role=="stu") { // is student
                            window.location.href = "/student#/?username="+$scope.form.username;
                        } else { // is employer
                            window.location.href = "/employer#/?username="+$scope.form.username;
                        }
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
