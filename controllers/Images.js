var ImgSearch=angular.module('ImagePortal',['ngRoute']);

ImgSearch.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){

$routeProvider.when('/home',{
templateUrl : '/home',
}).when('/ImageCategory/:name',{
templateUrl : '/ImageCategory',
controller : 'ImagePool'
}).when('/contact',{
templateUrl : '/contact',
}).when('/thankyou',{
templateUrl : '/thankyou',
}).otherwise({
  redirectTo:'/home'
});
 $locationProvider.html5Mode(true);
}]);

ImgSearch.controller('ImgHome',function($scope,$http){

$scope.ImageNameScope= function(){
  $http({
 method:'GET',
 url : '/ImageNameScope'
}).then(function success(response){
  console.log("List received");
  console.log(response['data']);
$scope.List=response['data'];
},function error(response){
console.log(response.status);
console.log("There was an error");
});
};
$scope.ImageNameScope();
});

ImgSearch.controller('ImagePool',function($scope,$http,$routeParams){


$scope.ImagePool= function(name){
  $http({
 method:'GET',
 url : '/ImageCategory/'+name
}).then(function success(response){
console.log(response['data']);
   $scope.data=response['data'];
   $scope.name=name;
},function error(response){
console.log(response.status);
console.log("There was an error");
});
};
$scope.ImagePool($routeParams.name);



});

ImgSearch.controller('contactController',function($scope,$http){
  $scope.submitRequest=function(){
    $http({
    method:'POST',
    url : '/contactRequest',
    data : $scope.contact
    }).then(function success(){
    },function error(response){
    console.log(response.status);
    console.log("There was an error");
    });

  };
  $scope.received=function(){
    alert("Thank You for contacting us.A member will get back to you soon.");
    $scope.contact={};
  };

});
