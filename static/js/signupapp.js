var signupApp = angular.module('signupApp', []);

signupApp.controller('signupCtrl', function($scope, $http){
    $scope.form = {
        name : "",
        email : "",
        password : "",
        valid : false
    };
    $scope.submit = function() {
        console.log("Submitting signup info...")
        $http.post('/api/signup', $scope.form)
        .success(function(data){
            if (data.idt==="data") {
                alert("Signup successful!");
                // TODO: redirect to page
            } else { // error
                alert("Signup information incorrect!");
            }
        });
    };
});
