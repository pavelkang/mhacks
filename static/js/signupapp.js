var signupApp = angular.module('signupApp', []);

signupApp.factory("signFactory", function($http, $q){
    return {
        sendForm : function(form) {
            var deferred = $q.defer();
            $http.post('/api/signup', form)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(err) {
                    deferred.reject("Code validation failed!");
                });
            return deferred.promise;
        }
    }
})

signupApp.controller('signupCtrl', function(signFactory, $location, $scope, $http){
    $scope.form = {
        username : "",
        email : "",
        password : "",
        check : "",
        role : ""
    };
    $scope.submit = function(form) {
        $scope.form.role = $location.search().role;
        if (validate($scope.form)) {
            signFactory.sendForm(form).then(function(data){
                if (data.idt==="error") {
                    alert(data.error);
                } else {
                    alert("Signup successful!");
                    if ($scope.form.role==="stu") { // is student
                        window.location.href = "/student#/?username="+$scope.form.username;
                    } else { // is employer
                        window.location.href = "/employer#/?username="+$scope.form.username;
                    }
                }
            });
        }
    };
});

var validate = function(form) {
    valid = (form.password === form.check);
    if ((!form.username)||(!form.email)||(!form.password)||(!form.role)||(!valid)) {
        alert("Information not valid!");
        return false;
    }
    return true;
}
