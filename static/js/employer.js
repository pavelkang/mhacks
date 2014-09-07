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
    $scope.data = {
        percent : 0,
        msg : "",
        zigOpen : false
    };
    $scope.openZiggeo = function() {
        document.getElementById("z").style.display = "block";
        $scope.data.zigOpen = true;
    }

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
                $scope.data.percent = parseInt(100.0 * evt.loaded / evt.total);
                document.getElementById("pb").style.width = $scope.data.percent + "%";
                if ($scope.data.percent===100.0) {
                    $scope.data.msg = "Finished!";
                }
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
    // list of past problems
    $scope.table = [];
    $scope.testTable = [
        {
            "problem" : 0,
            "content" : ["a", "b", "c"],
            "problemType" : "audio",
            "token" : "12345"
        },
        {
            "problem" : 1,
            "content" : ["d", "e", "f"],
            "problemType" : "audio",
            "token" : "12345"
        }
    ];
    empFactory.getHist().then(function(data){
        if (data.idt==="error") {
            alert("Failed to get data");
        } else {
            $scope.table = data.data;
            $scope.vis.tableVis = true;
        }
    });
    $scope.isAudio = function(entry) {
        return entry.problemType==="audio";
    };
    $scope.isZiggeo = function(entry){
        return entry.problemType === "ziggeo";
    }
});
