var loginApp = angular.module('loginApp', []);

loginApp.controller('loginCtrl', function($scope, $http){
    $scope.form = {
        name : "",
        password : "",
        valid : false
    };
    $scope.submit = function() {
        if (validate($scope.form)) {
        $http.post('/api/login', $scope.form)
        .success(function(data){
            if (data.idt==="data") {
                alert("Login successful!");
                // TODO redirect by query
                window.location.href = "/student";
            } else { // error
                alert("Login information incorrect!");
            }
        });}
    };
});

var validate = function(form) {
    if ((!form.name)||(!form.password)) {
        alert("Login information not complete!");
        return false;
    }
    return true;
}