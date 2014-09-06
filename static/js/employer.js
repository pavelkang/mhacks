var empApp = angular.module('empApp', []);

empApp.factory('empFactory', function($http, $q){
    return {
        getHist : function() {
            var deferred = $q.defer();
            $http.get('/api/hist').success(function(data){
                deferred.resolve(data);
            }).error(function(){
                deferred.reject('An error occurred!')
            });
            return deferred.promise;
        }
    }
});

empApp.controller('empCtrl', function(empFactory, $scope){
    $scope.vis = {
        tableVis : false
    };
    $scope.table = []; // list of past problems
    $scope.testTable = [
        {
            "problem" : 0,
            "content" : ["a", "b", "c"]
        },
        {
            "problem" : 1,
            "content" : ["d", "e", "f"]
        }
    ];
    empFactory.getHist().then(function(data){
        if (data.idt==="error") {
            alert("Failed to get data");
        } else {
            console.log("A");
            $scope.table = data.data;
            $scope.vis.tableVis = true;
        }
    });
})
