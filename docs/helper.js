var ngModel = angular.module('DocsApp', [])
    .config(function(){
        //
    });

ngModel.controller('DocsCtrl', function($scope, $timeout, $anchorScroll, $location, $window) {
    $scope.content = 'main.html';

    $scope.loadContent = function(template) {
        $scope.scrollTo('top');
        $scope.content = template + '.html';
        $timeout(function() {
            PR.prettyPrint();
        }, 100);
    };

    $scope.scrollTo = function(anchor) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(anchor);

        // call $anchorScroll()
        $anchorScroll();
    };
});