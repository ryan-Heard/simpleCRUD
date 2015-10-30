/**
 * Created by ryan on 10/26/2015.
 */
var myApp = angular.module('directory', []);
myApp.controller('cardsCtrl', function($scope,$http) {

  $scope.persons = [];
  $scope.query = "";

  $scope.addNew = function(){
    var pending = {};
    pending.firstName = "[First]";
    pending.lastName = "[Last]";
    pending.city = "[City]";
    pending.zipCode = "[Zip Code]";
    pending.hasBeenSent = false;
    $scope.persons.unshift(pending);

  }

  $scope.getAllContacts = function(){
    $http.get("/api/directory/all")
      .success(function(response){
        $scope.persons = response;
        $scope.persons.forEach(function(person){
          person.isDeleted = false;
          person.isChanging = false;
        })
      }
    );
  }

  $scope.addContact = function(obj){
    delete obj.hasBeenSent;
    $http.post('/api/directory/',obj).success(function(err,response){
      return true;
    }).error(function(err){
      return false;
    });
  }

  $scope.deleteContact = function(obj){
    $http.delete("/api/directory/"+obj._id).success(function(response){
      obj.isDeleted = true;
      return true;
    }).error(function(){return false;});
  };

  $scope.find = function(){
    $http.get("/api/find/"+$scope.query).success(function(response){
      $scope.persons = response;
    });
  }

  $scope.updateContact = function(objID, info){
    $http.put("/api/directory/"+objID,info).success(function(response){
      return true;
    });
  }

  $scope.checkEmpty = function(obj){
    if(obj.firstName == "" || obj.lastName == "" || typeof obj.hasBeenSent == 'boolean' || obj.city == "" || obj.zipCode == null ){
      return true;
    }
    return false;
  }
});