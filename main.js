'use strict';
var MainControllers = angular.module('MainControllers', []);
angular.module('MainControllers').controller('MainCtrl',function ($scope,$location ,CordovaService,DatabaseService) {
	  // Main Controller Code
	CordovaService.ready.then(function() {
	      // Cordova is ready
		console.log("CordovaService.ready.then CordovaService.ready.then");
		//DatabaseService.openDB();
	    });
	//document.addEventListener("backbutton", handleDeviceBackButton, false);
	$scope.goHome = function () {
			console.log("goHome goHome goHome goHome MainControllers");
		 	history.back();
            $scope.$apply();
        }
	$scope.showAlert = function () {
		console.log("showAlert showAlert MainControllers");
		navigator.notification.alert('Hi Demo alert', alertCallback,'Dialog Example','Done');
    }
	$scope.showConfirm = function () {
		console.log("showConfirm showConfirm MainControllers");
		navigator.notification.confirm('You are the winner!', // message
		onConfirm, // callback to invoke with index of button pressed
		'Game Over', // title
		[ 'Restart', 'Exit' ] // buttonLabels
		);
    }
	$scope.showPrompt = function () {
		console.log("showPrompt showPrompt MainControllers");
		navigator.notification.prompt(
			        'Please enter your name',  // message
			        onPrompt,                  // callback to invoke
			        'Registration',            // title
			        ['Ok','Exit'],             // buttonLabels
			        'Jane Doe'                 // defaultText
			    );

    }
	$scope.playBeep = function () {
		console.log("playBeep playBeep MainControllers");
		navigator.notification.beep(3);

    }
	$scope.vibrate = function () {
		console.log("vibrate vibrate MainControllers");
		navigator.notification.vibrate(2000);
		//DatabaseService.creatDB();
		//DatabaseService.getStudentList();
		//db.transaction(populateDB, errorDB, successDB);
    }
	$scope.student = function () {
		console.log("student student MainControllers");
		$location.url('/student');
    }
  });

function alertCallback()
{
	console.log('alertCallback alertCallback');
}
function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}
function onPrompt(results) {
    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
}

