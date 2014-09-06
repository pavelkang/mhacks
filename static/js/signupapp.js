var signupApp = angular.module('signupApp', []);

signupApp.controller('signupCtrl', function($location, $scope, $http){
    $scope.form = {
        name : "",
        email : "",
        password : "",
        check : "",
        id : ""
    };
    $scope.submit = function() {
        $scope.form.id = $location.search().role;
        validate($scope.form)
        $http.post('/api/signup', $scope.form)
        .success(function(data){
            if (data.idt==="data") {
                alert("Signup successful!");
                // Redirect
                if ($scope.form.id==="stu") {
                    window.href = "/student";
                } else {
                    window.href = "/employer";
                }
            } else { // error
                alert("Signup information incorrect!");
            }
        });
    };
});

var validate = function(form) {
    valid = form.password === form.check;
    if ((!form.name)||(!form.email)||(!form.password)||(!valid)) {
        alert("Information not valid!");
        return false;
    }
    return true;
}
