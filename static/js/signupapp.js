var signupApp = angular.module('signupApp', []);

signupApp.controller('signupCtrl', function($location, $scope, $http){
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
        $http.post('/api/signup', form)
        .success(function(data){
            if (data.idt==="data") {
                alert("Signup successful!");
                // Redirect
                if ($scope.form.role==="stu") {
                    window.href = "/student";
                } else {
                    window.href = "/employer";
                }
            } else { // error
                alert("Signup information incorrect!");
            }
        });}
    };
});

var validate = function(form) {
    console.log(form);
    valid = (form.password === form.check);
    if ((!form.username)||(!form.email)||(!form.password)||(!form.role)||(!valid)) {
        alert("Information not valid!");
        return false;
    }
    return true;
}
