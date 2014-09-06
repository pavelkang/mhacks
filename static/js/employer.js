var empApp = angular.module('empApp', ['angularFileUpload']);

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

empApp.controller('MyCtrl', function($scope, $upload){
  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: '/api/audio',
        data: {myObj: $scope.myModelObj},
        file: file,
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        console.log(data);
      });
    }
  };
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
