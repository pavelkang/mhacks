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
        console.log("Submitting...");
        if (validate($scope.form)) {
            // http request here
            $http.post('/api/answer', $scope.form)
            .success(function(data){
                console.log("POSTING" + data);
            });
        }
    };
});

var validate = function(form) {
    console.log("Form" + form);
    if (form.type==0) { // choice question
    } else { // input question
        if (form.input==="") {
            alert("Not valid!");
            return false;
        }
    }
    return true;
}
