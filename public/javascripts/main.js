/**
 * Created by ryan on 10/26/2015.
 */
var myApp = angular.module('directory', []);
myApp.controller('cardsCtrl', function($scope,$http) {
  console.log("Made Something");
  $scope.persons = [];
  $scope.query = "";


  $scope.getAllContacts = function(){
    $http.get("/api/directory")
      .success(function(response){
         $scope.persons = response;
        $scope.persons.forEach(function(person){
          person.isDeleted = false;
        })
      }


    );
  }

  $scope.deleteContact = function(objID){
    $http.delete("/api/directory/"+objID).success(function(response){
      console.log(response);

      
    })
  }
});