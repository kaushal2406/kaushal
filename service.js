var mod = angular.module('starter.services', [])

/**
 * The meet service
 */
mod.factory('Meets', function($http, $rootScope, Auth, $filter, Utils,$ionicScrollDelegate) {
	  return {
			  commonGet: function(url) { 
				  //call url to get meets
				Auth.setCredentials($rootScope.username,$rootScope.password);
			    console.log(' http Get common url ' + url +' '+$rootScope.device_id);
			    
			    var deviceId = $rootScope.device_id;
			    if(deviceId == undefined){
			    	deviceId = 'Request is from browser.please test from device !!!';
			    }
			    // comment below code to check with device id
			  	var promise = $http.get(url,{ params: { device_id: deviceId }}).success(function (data, status) {
			  		return data; //this success data will be used in then method of controller call 
				})
				.error(function (data, status) {
					return null; //this failure data will be used in then method of controller call
				});
				
			  	return promise; //return promise object to controller  
		  	},
		  /** 
		   * Calling asyncAll will call get all meet url api and return promise object to controller. 
		   * When calling service from controller, controller does't wait till response is come from the api so we will 
		   * return promise object and write then method in the controller and 
		   * wait till api call success completed and get result in controller. 
		   * If not doing this way then get undefined object since it not wait for response of api call and return value directly.
		   * doing Same way for All the API Calls.  http://lit-cliffs-5040.herokuapp.com/api/meets/get_upcoming_meets/5
		   **/
		  
		  asyncAll: function() { 
			  //call url to get meets
		    var url = $rootScope.apiServer + '/meets';
		    console.log(' http Get asyncAll ' + url);
		  	var promise = this.commonGet(url);
			return promise; //return promise object to controller  
	  	},
	  	asyncUpcoming: function(noOfMeets) { 
			  // Get upcoming meets
		    var url = $rootScope.apiServer + '/meets/get_upcoming_meets/'+noOfMeets;
		    console.log(' http Get asyncUpcoming ' + url);
		  	
		  	var promise = this.commonGet(url);
			return promise;   
	  	},
	    asyncGet: function(meetId) {
			  //call url to get specific meet
		    var url = $rootScope.apiServer + '/meets/'+meetId;
		    console.log(' http Get asyncAll ' + url);
		  	var promise = this.commonGet(url);
			return promise;
	  	},
	  	asyncGetTimeLineDetail: function(meetId) {
			  //call url to get specific meet
		    var url = $rootScope.apiServer + '/meets/get_meet_timeline/'+meetId;
		    console.log(' http Get asyncGetTimeLineDetail ' + url);
		  	var promise = this.commonGet(url);
			return promise;
	  	},
	  	//asyncGetWeatherDetail: function(lat,long) {
		   // var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long;
	  	asyncGetWeatherDetail: function(location) {
		    var url = 'http://api.openweathermap.org/data/2.5/weather?q='+location;
		    console.log(' http Get asyncGetWeatherDetail ' + url);
		  	var promise = $http.get(url)
		  	.success(function (data, status) {
		  		return data;
			})
			.error(function (data, status) {
				return null;
			});
			return promise;
	  	},
	  	//asyncGetForecastedWeatherDetail: function(lat,long, cnt) {
		    //var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+lat+'&lon='+long+'&cnt='+cnt+'&mode=json';
	  	asyncGetForecastedWeatherDetail: function(location, cnt) {
		    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+location+'&mode=json&cnt='+cnt;
		    console.log(' http Get asyncGetWeatherDetail ' + url);
		  	var promise = $http.get(url)
		  	.success(function (data, status) {
		  		return data;
			})
			.error(function (data, status) {
				return null;
			});
			return promise;
	  	},
	    asyncUpdateEventHeat: function(meetId,current_event,current_heat) {
			  //call url to post specific meet event & heat 
			Auth.setCredentials($rootScope.username,$rootScope.password);
		    var url = $rootScope.apiServer + '/meets/update_current_event_heat/'+meetId;
		    
		    console.log(' http Post update asyncUpdateEventHeat ' + url);
		    //var jsondata = {"current_event":current_event,"current_heat":current_heat};
		  	//console.log( " Json =================  "+JSON.stringify(angular.toJson(jsondata))); 
			var jsondata = "{\"current_event\":" + current_event + ", \"current_heat\":" + current_heat + "}"
		  	console.log( " Json =================  "+jsondata); 
		  	// "{\"current_event\":10, \"current_heat\":12}â€�
			//
		  	var promise = $http.post( url ,
		  			jsondata,
		  			{ headers: {'Content-Type': 'application/json'}}
		  	).success(function (data, status) {
		  		return data;
			})
			.error(function (data, status) {
				return null;
			});
			return promise;
	  	},
	  	asyncUpdateEndMeet: function(meetId) {
			  //call url to end meet by meetid 
			Auth.setCredentials($rootScope.username,$rootScope.password);
		    var url = $rootScope.apiServer + '/meets/end_meet/'+meetId;
		    
		    console.log(' http Post update end meet ' + url);
			//
		  	var promise = this.commonGet(url);
			return promise;
	  	},
	  	addNotification: function(serverId,meetId,on_event_id,for_event_id,phone,carrier,description) {
			  //call url to add notification
	  		Auth.setCredentials($rootScope.username,$rootScope.password);
		    var url ;
		    
		    //	"{\"on_event_id\":514, \"for_event_id\":515, \"phone\":\"5124237690\", \"carrier\":\"at&t\", \"description\":\â€�wades phone\"}" device_id
		    var deviceId = $rootScope.device_id;
		    if(deviceId == undefined){
		    	deviceId = 'Request is from browser.please test from device !!!'
		    }
		    var alertUpdateOrAdd ='';
		    var jsondata = "{\"on_event_id\":" + on_event_id + ",\"for_event_id\":" + for_event_id + ",\"phone\":\""+ phone + "\", \"carrier\":\"" + carrier + "\", \"description\":\""+description+"\",\"device_id\":\"" + deviceId +"\"}";
		    if(serverId==0)
	    	{ //add notification if server id == 0 
		    	url = $rootScope.apiServer + '/meets/add_notification/'+meetId;
		    	alertUpdateOrAdd = 'Alert is added for event ';
	    	}
		    else
	    	{ //update notification if server id != 0 
		    	url = $rootScope.apiServer + '/meets/update_notification/'+serverId;
		    	alertUpdateOrAdd = 'Alert is updated for event ';
	    	}
		  	console.log( " Json =================  "+jsondata);//""; 
		  	console.log(' http Post addNotification ' + url);
		  	var promise = $http.post( url ,
		  			jsondata,
		  			{ headers: {'Content-Type': 'application/json'}}
		  	).success(function (data, status) {
		  		$rootScope.analytics.sendEvent('Meet Event ', alertUpdateOrAdd + for_event_id ,  '['+meetId+']' , 0, successCallback, errorCallback);
		  		return data;
			})
			.error(function (data, status) {
				return null;
			});
		  	
		    console.log(' http Post addNotification ' + url);
			//
		  //	var promise = this.commonGet(url);
			return promise;
	  	},
	  	removeNotification: function(meetId) {
			  //call url to remove notification by meetid 
			Auth.setCredentials($rootScope.username,$rootScope.password);
		    var url = $rootScope.apiServer + '/meets/delete_notification/'+meetId;
		    
		    console.log(' get  update removeNotification  ' + url);
			//
		  	var promise = this.commonGet(url);
			return promise;
	  	},
	  	sendTestNotification: function(phone,carrier) {
			  //call url to remove notification by meetid 
			Auth.setCredentials($rootScope.username,$rootScope.password);
		    var url = $rootScope.apiServer + '/meets/send_test_notification/1?phone='+phone+'&carrier='+carrier;
		    
		    console.log(' get  sendTestNotification sendTestNotification  ' + url);
			//
		  	var promise = this.commonGet(url);
			return promise;
	  	},
	  	getTimeLineDetail: function($scope, meetId, Meets) {
	  		/*var worker = new Worker('js/updateTimeLine.js');
	  		worker.addEventListener('message', function (e) {
	  			//console.log('Worker says: ', angular.toJson(e.data));
	  			$scope.meetTimeLine = e.data;
	  			//$rootScope.meetTimeLine = $scope.meetTimeLine;
	  			worker.terminate();
	  		}, false); */

	  		$scope.getTimeLineDetails = function(){
		  		Meets.asyncGetTimeLineDetail(meetId).then(function(result) {
		  			
		    		console.log("MeetDetailTimeLineCtrl getTimeLineDetails getTimeLineDetails success ");
		    		
		    		if(result.data.sessions[0] != undefined && result.data.sessions[0].events != undefined){
		    			var eventObjectMap;
	    		 		try {
	    		 			eventObjectMap =  JSON.parse(window.localStorage.getItem(meetId));
						} catch (e) {
						}
	    				if(Utils.isUndefinedOrNull(eventObjectMap)){
	    					eventObjectMap = {};
	    				}
		    			var events = result.data.sessions[0].events;
		    			$scope.allTimeLine  = events;
		    			//worker.postMessage({'events': angular.toJson(events),'eventObjectMap':angular.toJson(eventObjectMap),'setting':angular.toJson($scope.setting)});
		    			 var flag = (typeof eventObjectMap != "undefined" && eventObjectMap != null);
		    				var temp = [];
		    				var eventObj=null;
		    				for(var i = 0 ; i < events.length ; i++){
		    					eventObj = events[i];
		    					
		    					eventObj['fav'] = flag ? 'fav'+eventObj.id in eventObjectMap : false;
		    					if(flag && eventObj['fav'] && ('sel'+eventObj.id in eventObjectMap))
		    					{
		    						eventObj['alertValue'] =  eventObjectMap['sel'+eventObj.id];
		    					}
		    					else
		    					{
		    						if(eventObj.number > 5)
		    						{
		    							eventObj['alertValue'] = $scope.setting.alertValue; 
		    						}
		    						else
		    						{
		    							eventObj['alertValue'] = (eventObj.number - 1 > $scope.setting.alertValue ) ? $scope.setting.alertValue : eventObj.number -1;
		    						}
		    					}
		    					
		    					if($scope.meet_choice !== 'MeetFinished')
	    						{
		    						if(eventObj.status !== 'completed') //Only show completed events
		    						{
		    							temp.push(eventObj);
		    						}
	    						}
		    					else
	    						{
		    						temp.push(eventObj);
	    						}
		    				}
		    				$scope.meetTimeLine  = temp;
		    		}
		    		else
	    			{
		    			$scope.meetTimeLine = result.data.sessions[0];
		    			$scope.timeLineNotAvailable='Timeline not available';
	    			}
		    		
		    	},function(result) {
					console.log("MeetDetailTimeLineCtrl failure");
					$scope.meetTimeLine =[];
					$scope.timeLineNotAvailable='Timeline not available';
					//$rootScope.meetTimeLine = $scope.meetTimeLine;
			  });
	  		};
	  		$scope.getTimeLineDetails();
	  	},
	  	getWeatherDetail:function($scope, $stateParams, Meets) {
	  		 
	  		$scope.getweatherServiceDetails = function(){
	  			console.log(" getweatherServiceDetails getweatherServiceDetails getweatherServiceDetails");
	  			 	Meets.asyncGet($stateParams.meetId).then(function(result) {
			    		var meet = result.data;
			    		if(meet.status == 'not started'){
			    			console.log("if if ======= if if " +meet.city+','+meet.state);
			    			//$scope.numberOfDays(meet.start_date,new Date()); //get days difference
			    			$scope.days = Utils.numberOfDays($scope.meet.start_date,$scope.meet.scheduled_start_time,new Date()); 
			    			$scope.tempInFahrenheit = 'N/A'; 
				    		$rootScope.tempInFahrenheit = $scope.tempInFahrenheit;
				    		$scope.weatherIcon = 'wi-refresh'; 
				    		$rootScope.weatherIcon = $scope.weatherIcon;
			    			if($scope.days<=14){
			    				//Meets.asyncGetForecastedWeatherDetail(position.coords.latitude, position.coords.longitude,$scope.days).then(function(result) {
				    			Meets.asyncGetForecastedWeatherDetail(meet.city+','+meet.state,$scope.days).then(function(result) {
			     		    		console.log("asyncGetForecastedWeatherDetail success ");
			     		    		//kelvin to Fahrenheit
			     		    		$scope.tempInFahrenheit = parseInt(((parseFloat(result.data.list[parseInt($scope.days)-1].temp.day) - 273.15)*1.8)+32);
						    		$rootScope.tempInFahrenheit = $scope.tempInFahrenheit;
						    		var weatherIcon = result.data.list[parseInt($scope.days)-1].weather[0].icon;
						    		
						    		weatherIcon = Utils.getIcon(weatherIcon);
						    		
						    		$scope.weatherIcon = weatherIcon; 
						    		$rootScope.weatherIcon = $scope.weatherIcon;
			     		    	 },function(result) {
			     		    		console.log("asyncGetForecastedWeatherDetail fails else 1");
			     		    		$scope.tempInFahrenheit = 'N/A'; 
						    		$rootScope.tempInFahrenheit = $scope.tempInFahrenheit;
						    		$scope.weatherIcon = 'wi-refresh'; 
						    		$rootScope.weatherIcon = $scope.weatherIcon;
			     		    	 });
		     		    	 }
				    		}else{
				    			console.log("else else ======= else else"+meet.city+','+meet.state);
				    			//Meets.asyncGetWeatherDetail(position.coords.latitude, position.coords.longitude).then(function(result) {
				    			Meets.asyncGetWeatherDetail(meet.city+','+meet.state).then(function(result) {
					    			
			     		    		console.log("asyncGetWeatherDetail success " );
			     		    		//kelvin to Fahrenheit
			     		    		var tempInFahrenheit = parseInt(((parseFloat(result.data.main.temp) - 273.15)*1.8)+32);
			     		    		$scope.tempInFahrenheit = tempInFahrenheit; 
						    		$rootScope.tempInFahrenheit = $scope.tempInFahrenheit;
						    		var weatherIcon = result.data.weather[0].icon;
						    		
						    		weatherIcon = Utils.getIcon(weatherIcon);
						    		$scope.weatherIcon = weatherIcon; 
						    		$rootScope.weatherIcon = $scope.weatherIcon;
			     		    	},function(result) {
			     		    		console.log("asyncGetForecastedWeatherDetail fails else 2");
			     		    		$scope.tempInFahrenheit = 'N/A'; 
						    		$rootScope.tempInFahrenheit = $scope.tempInFahrenheit;
						    		$scope.weatherIcon = 'wi-refresh'; 
						    		$rootScope.weatherIcon = $scope.weatherIcon;
			     		    	});
				    		}
			    			//locate meet on map
			    		 	 
			    	},function(result) {
			    	});
	  		};
	  		$scope.getweatherServiceDetails();
	  	},
	  	getMeetDetailInterval: function($scope, $interval, $stateParams, Meets){
	  		//alert('MeetDetailCtrl: ' + $stateParams.meetId);
		    console.log('MeetDetailCtrl ' + $stateParams.meetId);
		    // flag to maintain the network status and respectively error / event or heat number will be displayed
		   //'Connected','NotConnected','MeetNotStarted','MeetFinished'
        
		    $scope.meet_choice = 'MeetNotStarted';
		    $scope.preEventVar = 'N/A';
		    $scope.getDetails = function() {
		    	Meets.asyncGet($stateParams.meetId).then(function(result) {
		    		console.log( "MeetDetailCtrl  success " + $scope.meet_choice );
		    		$scope.meet = result.data;
                    console.log("meet.current_event_name----->"+$scope.meet.current_event_name);
                                                         
		    		var curEventVar = $scope.meet.current_event;
		    		$rootScope.meet = $scope.meet;
		    		console.log(" $scope.meet.status "+$scope.meet.status);
		    		if($scope.meet.status == 'not started')
	    			{
		    			$scope.meet_choice = 'MeetNotStarted';
		    			//$scope.numberOfDays($scope.meet.start_date,new Date()); //get days difference
		    			$scope.days = Utils.numberOfDays($scope.meet.start_date,$scope.meet.scheduled_start_time,new Date());
		    			
		    			if($scope.days==0)
	    				{
		    				var time = Utils.remainingTime($scope.meet.scheduled_start_time);
		    				console.log(time.hours+'=================================='+time.minutes); //{hours: 0, minutes: 30}
		    				$scope.remainingTime = time.hours + ' H : ' + time.minutes + ' M ';
	    				}
		    			else
	    				{
		    				$scope.remainingTime = $scope.days ;
	    				}
		    			//$scope.remainingTime =
		    			//$interval.cancel( timer );
	    			}
		    		else if($scope.meet.status == 'completed')
	    			{
		    			$scope.meet_choice = 'MeetFinished';
		    			//$scope.timeLineNotAvailable='TimeLine not available';
		    			$interval.cancel( timer );
		    			
	    			}
		    		else
	    			{
		    			$scope.meet_choice = 'Connected'; 
	    			}
		    		console.log('$scope.meet_choice ---------- ' + $scope.meet_choice )
		    		//On event change fetched timeLine
		    		if($scope.preEventVar != curEventVar){
		    			Meets.getTimeLineDetail($scope, $stateParams.meetId, Meets);
		    		}
		    		 $scope.preEventVar = $scope.meet.current_event;
		    	},function(result) {
					console.log("MeetDetailCtrl failure");
					//$rootScope.meet = [];
                    //        $scope.meet = [];
console.log("meet.current_event_name----->"+$scope.meet.current_event_name);
					 //$scope.preEventVarr = $scope.meet.current_event;
					$scope.timeLineNotAvailable='Timeline not available';
			  });
		    };
		    //get network status from plugin
		    try {
		    	var networkState = navigator.connection.type;
		    	console.log( Connection.CELL_2G + "$interval called" + networkState);
			} catch (e) {
			}
		    //if network is connected then call timer to update in background
		    // Auto refresh event & heat   
	    	var timer =  $interval(
	    			function() {
	    				console.log( "$interval called" );
	    				try {
	    			    	var networkState = navigator.connection.type;
	    				} catch (e) {
	    				}
	    				
	    				if(angular.isDefined(networkState) && networkState == Connection.NONE)
	    		    	{
	    					$scope.meet_choice = 'NotConnected';
	    					$scope.timeLineNotAvailable='Timeline not available';
	    		    	}
	    			    else
	    		    	{
		    				//$scope.meet_choice = 'Connected'; 
		    				$scope.getDetails();
	    		    	}
	    			},
	    			10000
	    	);
	    	//cancel timer call on destroy 
	    	$scope.$on(
	    			"$destroy",
	    			function( event ) {
	    				console.log( "Timeout executed");
	    				$rootScope.scrollPosition = $ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition();
	    				$interval.cancel( timer );
	    			}
	    	);
	    	if(angular.isDefined(networkState) && networkState == Connection.NONE)
	    	{
				$scope.meet_choice = 'NotConnected';
	    	}
	    	else
	    	{
				$scope.meet_choice = 'Connected'; 
				$scope.getDetails();
	    	}
	  	},
	  	suggestMeet: function(suggest) {
			  //call url to add notification
	  		Auth.setCredentials($rootScope.username,$rootScope.password);
		    
		    //var jsondata = "{\"name\":\"" + suggest.name + "\",\"email\":\"" + suggest.email + "\",\"message\":\""+ suggest.message + "\",\"device_id\":\"" + deviceId +"\"}";
		    var url = $rootScope.apiServer + '/meets/message_from_user/1';
		  	
		  	console.log(' suggestMeet http Post ' + url);
		  	console.log( " Json ================ angular.toJson =  "+angular.toJson(suggest));
		  	
		  	var promise = $http.post( url ,
		  			angular.toJson(suggest),
		  			{ headers: {'Content-Type': 'application/json'}}
		  	).success(function (data, status) {
		  		return data;
			})
			.error(function (data, status) {
				return null;
			});
		  	
			return promise;
	  	}
	  };
});

/**
 * Common Utils function service
 */
mod.factory('Utils', function($filter,$window,$rootScope,$timeout,$ionicPopup ) {
	  var service = {
	     isUndefinedOrNull: function(obj) {
	         return !angular.isDefined(obj) || obj===null;
	     },
	     isEmpty: function(obj) {
	         return !angular.isDefined(obj) || obj===null || obj==='';
	     },
	     getIcon: function(weatherIcon) {
	    	 
	    	 if(weatherIcon == '01d'){
	    			weatherIcon = 'wi-day-sunny';
	    		}else if(weatherIcon == '01n'){
	    			weatherIcon = 'wi-night-clear';
	    		}else if(weatherIcon == '02d'){
	    			weatherIcon = 'wi-day-cloudy-gusts';
	    		}else if(weatherIcon == '02n'){
	    			weatherIcon = 'wi-night-alt-cloudy-gusts';
	    		}else if(weatherIcon == '03d' || weatherIcon == '03n'){
	    			weatherIcon = 'wi-cloudy-gusts';
	    		}else if(weatherIcon == '04d' || weatherIcon == '04n'){
	    			weatherIcon = 'wi-cloudy';
	    		}else if(weatherIcon == '09d'){
	    			weatherIcon = 'wi-day-showers';
	    		}else if(weatherIcon == '09n'){
	    			weatherIcon = 'wi-night-showers';
	    		}else if(weatherIcon == '10d'){
	    			weatherIcon = 'wi-day-rain';
	    		}else if(weatherIcon == '10n'){
	    			weatherIcon = 'wi-night-rain';
	    		}else if(weatherIcon == '11d'){
	    			weatherIcon = 'wi-day-thunderstorm';
	    		}else if(weatherIcon == '11n'){
	    			weatherIcon = 'wi-night-thunderstorm';
	    		}else if(weatherIcon == '13d'){
	    			weatherIcon = 'wi-day-snow';
	    		}else if(weatherIcon == '13n'){
	    			weatherIcon = 'wi-night-snow';
	    		}else{
	    			weatherIcon = 'wi-refresh';
	    		}
	         return weatherIcon;
	     },
	     numberOfDays : function(start_time,scheduled_start_time,date2) { //Get date Difference 
	    	 	var date1;
	    	 	if(scheduled_start_time!=null && scheduled_start_time != undefined)
    	 		{
	    	 		date1 = scheduled_start_time;
    	 		}
	    	 	else
    	 		{
	    	 		date1 = start_time;
    	 		}
	    		var firstdate =  $filter('date')(date1, "dd/MM/yyyy"); 
	    		var seconddate = $filter('date')(date2, "dd/MM/yyyy");
	    		console.log(firstdate + " date " + seconddate);
	    	    if (firstdate != null && seconddate != null) {
	    	         var startDate = firstdate;
	    	         var endDate = seconddate;

	    	         var dt1 = firstdate.split('/');
	    	         var dt2 = seconddate.split('/');
	    	         var one = new Date(dt1[2], dt1[1], dt1[0]);
	    	         var two = new Date(dt2[2], dt2[1], dt2[0]);

	    	         var millisecondsPerDay = 1000 * 60 * 60 * 24;
	    	         var millisBetween = one.getTime() - two.getTime() ;
	    	         
	    	         var days = millisBetween / millisecondsPerDay;

	    	         console.log(" =============== days days  days " + Math.floor(days) );
	    	         return Math.floor(days);
	    	    }
	    	    else
    	    	{
	    	    	return 0;
    	    	}
    	 }, showDialog : function(msg){
    		 $rootScope.onOkTap = function(){
    			 $timeout(function() {
    				 confirmPopup.close();
    			 },	500 );
    		 };
         	var confirmPopup = $ionicPopup.show({
                 title: '',
                 template: '<div class="dialog-left"> ' + msg + '</div><div class="popup-buttons row" style="padding-left:0px;padding-right:0px;padding-bottom:0px;"><button class="button col ng-binding button-default" on-touch="onOkTap()" style="pedding:0px;">OK</button></div>'
                 });
         }, showDemoNotification : function(meetId){
	    	 if (meetId === '9') {
				var demoMeet;
				try {
					demoMeet = $window.localStorage.getItem('demoMeet');
				} catch (e) {
				}
				if (demoMeet !== 'true') {
					$window.localStorage.setItem('demoMeet','true');
					var msg = 'This meet is to demonstrate how MeetBop works. The meet repeats every 15 minutes. Because we do not want to spam you with alerts, the alert will only alert you one time for this demo meet.';
					this.showDialog(msg);
				}
	    	 }
         },
    	 remainingTime : function(scheduled_start_time) { //Get date Difference
    		 var hoursMinute = {};
    		 hoursMinute.hours = 0 ;
    		 hoursMinute.minutes = 0 ;
    		 
 			 var date2 = new Date();
    		 if(scheduled_start_time!=null && scheduled_start_time!='')
	   		  {
	   			  
	    		//var timeStart =  $filter('date')(scheduled_start_time, "dd/MM/yy h:mm a"); 
	    		//var timeEnd = $filter('date')(date2, "dd/MM/yy h:mm a");
	    		
	    	//	console.log('timeStart '+ timeStart);
	    	//	console.log('timeEnd '+ timeEnd);
	    		
	    		var timeStart = new Date(date2).getTime();
	    		var timeEnd = new Date(scheduled_start_time).getTime();
	    		
	    		console.log('timeStart '+ timeStart);
	    		console.log('timeEnd '+ timeEnd);
	    		
	    		var hourDiff = timeEnd - timeStart; //in ms
	    		if(hourDiff > 0)
    			{
	    			var secDiff = hourDiff / 1000; //in s
	    			var minDiff = hourDiff / 60 / 1000; //in minutes
	    			var hDiff = hourDiff / 3600 / 1000; //in hours
	    			hoursMinute.hours = Math.floor(hDiff);
	    			hoursMinute.minutes = Math.floor( minDiff - 60 * hoursMinute.hours);
	    			
    			}
	    		
	    		console.log(hoursMinute.hours+'=================================='+hoursMinute.minutes); //{hours: 0, minutes: 30}
	    		
	   		  }
    		 else
			 {
    			 console.log('==================================scheduled_start_time value is null from server'); 
			 }
    		 return hoursMinute;
	    	} 

  	 }
	  return service;
	});

mod.factory('HistoryService', function ($ionicViewService, $window ,$ionicPlatform) {
    // initialize to whatever is in the cookie, if anything
    return {
        back: function () {
          
    		  console.log(' onHardwareBackButton getCurrentStateName -> '+ $ionicViewService.getCurrentStateName());
        	  var currentview = $ionicViewService.getCurrentStateName();
 		 
	  		  if(currentview!= null && currentview === 'tab.meet-remote')
	  		  {
	  			 console.log(' if if =========== -2' );
	  			$window.history.go(-2);
	  		  }
	  		  else if(currentview!=null && currentview==='tab.meets')
	  		  {
	  			 console.log('================exit====================' );
	  			 ionic.Platform.exitApp();
	  		  }
	  		  else
	 		  {
	  			 console.log(' currentview ' + currentview);
	  			 console.log('history go back -1' );
	 	 		 $window.history.go(-1);
	 		  }
        }
    };	
   
});

mod.factory('HistoryBackTwiceService', function ($ionicViewService, $window ,$ionicPlatform ,$rootScope) {
    // initialize to whatever is in the cookie, if anything
	return {
        backTwice: function () {
          
    		  console.log(' onHardwareBackButton getCurrentStateName -> '+ $ionicViewService.getCurrentStateName());
        	  var currentview = $ionicViewService.getCurrentStateName();
 		 
	  		  if(currentview!= null && currentview === 'tab.success' )
	  		  {
	  			$rootScope.restoreScroll= true;
	  			 console.log(' if if =========== -2' );
	  			$window.history.go(-2);
	  		  }
	  		  else if(currentview!= null && currentview === 'tab.suggestSuccess')
  			  {
	  			console.log(' suggestSuccess =========== -2' );
	  			$window.history.go(-2);
  			  }
	  		  
        }
    };	
});
/** 
 * convert username and password to base64 string
 */
mod.factory('Auth', function (Base64, $http) {
    // initialize to whatever is in the cookie, if anything
    return {
        setCredentials: function (username, password) {
            var encoded = Base64.encode(username + ':' + password);
            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        }
    };
});

mod.directive('detectGestures', function($ionicGesture) {
	  return {
	    restrict :  'A',

	    link : function(scope, elem, attrs) {
	      var gestureType = attrs.gestureType;
	      console.log(' gestureType  gestureType gestureType' + gestureType);
          $ionicGesture.on('doubletap', scope.doubletapEvent, elem);

	    }
	  }
});
/** 
 * Authentication header creation base64 Algorithm
 */
mod.factory('Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
});
