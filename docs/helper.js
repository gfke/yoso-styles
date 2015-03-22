var ngModel = angular.module('DocsApp', [])
    .config(function(){
        //
    });

ngModel.controller('DocsCtrl', function($scope, $timeout) {
    $scope.content = 'main.html';

    $scope.loadContent = function(template) {
        $scope.content = template + '.html';
        $timeout(function(){
            PR.prettyPrint();
        }, 100);

    }
});