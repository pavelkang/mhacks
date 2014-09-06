var stuApp = angular.module('stuApp', []);
// factory goes here
stuApp.factory('stuFactory', function($http, $q){
    return {
        getProblem : function() {
            var deferred = $q.defer();
            $http.get('/api/problem').success(function(data){
                deferred.resolve(data);
            }).error(function(){
                deferred.reject('An error occurred!')
            });
            return deferred.promise;
        }
    }
});

stuApp.controller('stuCtrl', function($scope, $http, stuFactory){
    $scope.data = {
        id : "",
        source : "nothing"
    }
    $scope.form = {
        choice : 0,
        input : "",
        type : -1,
        ID : -1
    };
    stuFactory.getProblem().then(function(data){
        $scope.data.id = data.id;
        $scope.data.src = "../static/audio/" + data.id + ".mp3";
    });
    $scope.submit = function() {
        if (validate($scope.form)) {
            // http request here
            console.log($scope.form);
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
