'use strict';
var db ;
var app = angular.module('myNewProjectApp', [ 'ngRoute', // route dependent
'MainControllers', // include main controller
'StudentControllers',
'fsCordova',
'dbService'
]).config(function($routeProvider) {
	// route configuration
	$routeProvider.when('/', {
		templateUrl : 'views/main.html',
		controller : 'MainCtrl'
	})
	 .when('/student', {
        templateUrl: 'views/student.html',
        controller: 'StudentCtrl'
      }).otherwise({
		redirectTo : '/'
	});
});
document.addEventListener('deviceready', loadTheApp);        
// Listen to device ready

function loadTheApp() {
    // Hide splash screen if any
	 angular.bootstrap( document, ['myNewProjectApp']);
    // regester all events
    console.log('loadTheApp loadTheApp loadTheApp ');
    // document.addEventListener("backbutton", handleDeviceBackButton, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
  // Set other evens you need to listen to.
    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);
    
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
   /* navigator.splashscreen.show();
    
    setTimeout(function() {
        navigator.splashscreen.hide();
        
    }, 10000);*/
    db = window.sqlitePlugin.openDatabase({name: "Database"});
    
    //window.addEventListener("batterycritical", onBatteryCritical, false);
}
function onOnline()
{	
	// Handle the onOnline event
	console.log('onOnline onOnline');
}
function onOffline()
{	
	 // Handle the onOffline event
	console.log('onOffline onOffline');
}
function onPause() {
    // Handle the pause event
	console.log('onPause onPause');
}
function onResume() {
    // Handle the resume event
	console.log('onResume onResume');
}
function onBatteryCritical(info) {
    // Handle the battery low event
    alert("Battery Level Low " + info.level + "%");
}
function handleDeviceBackButton(){
    /* write you code here */
	console.log('handleDeviceBackButton handleDeviceBackButton');
	 
}
function onMenuKeyDown() {
    // Handle the back button
	console.log('onMenuKeyDown onMenuKeyDown');
}

