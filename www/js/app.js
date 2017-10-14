var example = angular.module('starter', ['ionic', 'ngSanitize']);
example.run(function($ionicPlatform, $timeout, $http) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
example.controller("ExampleController", ['$scope','$http','$rootScope',  function($scope, $http, $rootScope, $cordovaContacts) 
{

    $scope.testmethod = function() 
    {
	
	var options = new ContactFindOptions();
	options.filter = "";
  	 options.multiple = true;
  	 fields = ["displayName"];	
	navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

	
		/*$http(
	      {//add wallet to customer
	        method: 'GET',
	        url:'http://vedpay.com/api/Android.aspx?from=Customer&message=6%20WAREQ%209462929419%2015%201.1.1.1',
	        data:''
	      }).then(function successCallback(response) 
	      {
		//catch transaction id here 

			var data= response.data;
			var data1=JSON.parse(data.substring(0, data.indexOf('\r')));
			console.log(JSON.stringify(data1));
			if(data1.Status==0)
			{
				$scope.call_back_data=	
				{
					txnid:data1.TransactionID,
					amount:data1.NetAmount,
					Hash:data1.Hash,
					firstname: 'deepak',
					email: 'dpkchaudhary337@gmail.com',
					phone: '9462929419'					

				};

			
			var data='key=38e9tU45&txnid=8660018206&amount=15.00&productinfo=wallet&firstname=deepak&email=dpkchaudhary337@gmail.com&phone=9462929419&Hash=5cc50c4cefdb069e0a43963ec55000964fddbb65010428aca27c107b1824ef02805a587fdeb33bfc4c0bdf5850e0644731bf98e265abc3f8da72383814e86db0';
				onDeviceReadyTest(data);
			}
			


	      }, function errorCallback(response) 
	      {
	      });
*/        

    }
   function contactfindSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
         alert("Display Name = " + contacts[i].displayName);
      }
   }
	
   function contactfindError(message) {
      alert('Failed because: ' + message);
   }

    $scope.test_function=function()
    {


    	alert('test function');

    }
    $scope.success_c=function()
    {


    	//tell the server i got successs here ....
    	alert('got the success hrere');

    	var data={
    		UserID:'9462929419',
    		Password:'123456',
    		TransactionID: '',
    		MethodName: 'wstatus'

    	};
    	/*
    	$http(
	      {
	        method: 'GET',
	        url:'http://vedpay.com/api/Android.aspx',
	        data:''
	      }).then(function successCallback(response) 
	      {

	      }, function errorCallback(response) 
	      {


	      });


*/

    }



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
        	alert('check now '+JSON.stringify(values));
            //incase values[0] contains result string
            var a = getValue(values[0], 'mihpayid');
            var b = getValue(values[0], 'status');
            var c = getValue(values[0], 'unmappedstatus');
            var d = getValue(values[0], 'txnid');

            alert('final result a mihpayid :'+a);
            alert('final result b status:'+b);
            alert('final result c unmappedstatus :'+c);
            alert
            var data={
            	mihpayid:a,
            	status:b,
            	amount:c,
            	txnid:d
            }

			navigator.notification.activityStart("Please Wait", "It'll only take a moment...");
          $http(
	      {//add wallet to customer
	        method: 'POST',
	        url:'http://vedpay.com/api/pg_return.aspx',
	        data:data
	      }).then(function successCallback(response) 
	      {


	      	alert('response :'+JSON.stringify(response));
	      	$scope.success();
	      
	      }, function errorCallback(response) 
	      {
	      });
    		navigator.notification.activityStop();

           
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
function onDeviceReadyTest(data) 
{	

        iabRef = window.open('payuBiz.html?'+data, '_blank', 'location=no');
		iabret=iabRef.addEventListener('loadstart', iabLoadStart);
	    iabRef.addEventListener('loadstop', iabLoadStop);
	    iabRef.addEventListener('loaderror', iabLoadError);
	    iabRef.addEventListener('exit', iabClose);

}

}]);
