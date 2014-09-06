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
    empFactory.getHist().then(function(data){
        console.log(data);
    })
})
