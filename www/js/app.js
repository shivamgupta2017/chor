var example = angular.module('starter', ['ionic', 'ngSanitize']);
example.run(function($ionicPlatform, $timeout) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
example.controller("ExampleController", ['$scope',  function($scope) {
    $scope.testmethod = function() {
        onDeviceReadyTest();
    }
}]);
// Global InAppBrowser reference
var iabRef = null;

//load start event
function iabLoadStart(event) 
{
	navigator.notification.activityStart("Please Wait", "It'll only take a moment...");
   /*  if (event.url.match("https://payu.herokuapp.com/success")) {
       // iabRef.close();
    } */
}


function iabLoadStop(event) 
{
    navigator.notification.activityStop();

    if (event.url.match("https://payu.herokuapp.com/success")) 
    {
        alert(' if ke andar ehllo shivam');
        alert('iabLoadStop :'+JSON.stringify(event));

        iabRef.executeScript({
            code: "document.body.innerHTML"
        }, function(values) 
        {
        	alert(JSON.stringify(values));
            //incase values[0] contains result string
            var a = getValue(values[0], 'mihpayid');
            var b = getValue(values[0], 'status');
            var c = getValue(values[0], 'unmappedstatus');
            alert('final result :'+(a + b + c));
            alert('final result again :'+(a + b + c));//you can capture values from return SURL
           // navigator.notification.activityStop();
            
            //or
            //incase values[0] contains result string
            // console.log(getValue(values, 'mihpayid'))
        });
  
 	iabRef.close();
  }
}

//get values from inner HTML page i.e success page or failure page values
function getValue(source, key) 
{
    var pattern = key + '=(\\w+)(&amp;)?';
    var expr = new RegExp(pattern);
    var result = source.match(expr);
    return result[1];
}


//load error event
function iabLoadError(event) 
{
    alert('error');
    alert(event.type + ' - ' + event.message);
    navigator.notification.activityStop();

}
//close event
function iabClose(event) 
{
	alert('iabclose :'+JSON.stringify(event));
	navigator.notification.activityStop();
    /*iabRef.removeEventListener('loadstart', iabLoadStart);
    iabRef.removeEventListener('loadstop', iabLoadStop);
    iabRef.removeEventListener('loaderror', iabLoadError);
    iabRef.removeEventListener('exit', iabClose);*/
}
// device APIs are available
//
function onDeviceReadyTest() 
{
	
    iabRef = window.open('payuBiz.html', '_blank', 'location=no');
	iabRef.addEventListener('loadstart', iabLoadStart);
    iabRef.addEventListener('loadstop', iabLoadStop);
    iabRef.addEventListener('loaderror', iabLoadError);
    iabRef.addEventListener('exit', iabClose);
}