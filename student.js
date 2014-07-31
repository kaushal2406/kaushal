'use strict';
var StudentControllers = angular.module('StudentControllers', []);
StudentControllers.controller('StudentCtrl', function ($scope ,DatabaseService) {
	//Studen controller code
	$scope.students = [];

	console.log("CordovaService call " + $scope.students);
	DatabaseService.openDB();
	DatabaseService.creatDB();
	//DatabaseService.insertStudent('Kaushal','Reading','Sanskar vidhyalay');
	var studentsList = DatabaseService.getStudentList();
	//add rows into students object
	for (var i = 0; i < studentsList.length; i++) {
		console.log(angular.toJson(studentsList.item(i))+ " item " + studentsList.item(i));
		$scope.students.push(studentsList.item(i));
	}
	console.log("students json ===== " +$scope.students);
	$scope.goBack = function () {
		console.log("goBack goBack goBack goBack ");
	 	history.back();
        $scope.$apply();
    }
  });
