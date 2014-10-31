var myApp = angular.module('myApp',['directives']);

myApp.controller('Controller', ['$scope', function($scope) {
    
    $scope.userformsubmit = function(){
        console.log('User form submitted!');
    }

}]);
