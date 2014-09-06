var loginApp = angular.module('loginApp', []);

loginApp.controller('loginCtrl', function($scope, $http){
    $scope.form = {
        name : "",
        password : "",
        valid : false
    };
    $scope.submit = function() {
        console.log("Submit login info...");
        $http.post('/api/login', $scope.form)
        .success(function(data){
            if (data.idt==="data") {
                alert("Login successful!");
                // TODO: redirect to page
            } else { // error
                alert("Login information incorrect!");
            }
        });
    };
});
