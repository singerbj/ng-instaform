var myApp = angular.module('myApp',['directives']);

myApp.controller('Controller', ['$scope', function($scope) {
    
    $scope.userForm = {
      "model":"user",	
      "enterKey": "true",
      "inputs": [
        {
          "attribute":"name",
          "type":"text",			
          "maxlength":"10", 
          "minlength":"5",
          "required":"true",
        },
        {
          "attribute":"email",
          "type":"email",			
          "maxlength": "30",
          "minlength": "5",
          "required": "true",			
        }, 
        {
          "attribute":"i_like_cookies",
          "type":"checkbox",			
          "required":"true"
        }, 
        {
          "attribute":"description",
          "type":"text",			
          "maxlength":"10", 
          "minlength":"0",
          "required":"false",
        }, 
        {
          "attribute":"password",
          "type":"password",			
          "maxlength":"10", 
          "minlength":"3",
          "required":"false",
        },    
        {
          "attribute":"select_a_thing",
          "type":"select",
          "options":["Option 1","Option 2","Option 3"],
          "required":"true"
        },   
        {
          "attribute":"which_option",
          "type":"radio",
          "options":["Option 1","Option 2","Option 3"],
          "required":"true"
        },   
        {
          "attribute":"date_of_birth",
          "type":"date",			
          "required":"true"
        },   
        {
          "attribute":"time_you_became_awesome",
          "type":"time",			
          "required":"true"
        }   
      ]
    }; 

    $scope.userformsubmit = function(){
        console.log('User form submitted!');
    }

}]);
