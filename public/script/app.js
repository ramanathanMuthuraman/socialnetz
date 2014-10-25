/**
* Created with socialnetz.
* User: ramanathan
* Date: 2014-10-14
* Time: 11:51 AM
* To change this template use Tools | Templates.
*/
 //document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    
    function onDeviceReady() {
        
      
    }

var NETWORK = {
  
    "FACEBOOK_CLIENT_ID" : "377105592436893"
};


var MESSAGES = {
        "LOGIN_SUCCESS":"Facebook login succeeded",
        "LOGIN_FAIL":"Facebook login failed",
        "SHARE":"The item was posted on Facebook",
        "REVOKE":"Permissions revoked",
        "LOGOUT":"Logout successful"
};


(function($){
    $.socialnetz = function(options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
      
        base.init = function(){
            base.options = $.extend({},$.socialnetz.defaultOptions, options);
            fb.init({appId: NETWORK.FACEBOOK_CLIENT_ID});
            $("#login").on("click",base.login);
            $("#getInfo").on("click",base.getInfo);
            $("#share").on("click",base.share);
            $("#revoke").on("click",base.revoke);
            //$("#logout").on("click",base.logout);
           
            // Put your initialization code here
        };
        

         // Defaults to sessionStorage for storing the Facebook token
   


    //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
    //  fb.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage});
     base.popup = function (msg){

        $("#feedback-msg").html(msg);
        $('#myModal').modal('show')

     };
     base.login = function() {
        fb.login(
                function(response) {
                    if(response.status === 'connected') {
                        base.popup(MESSAGES.LOGIN_SUCCESS);
                       // alert('Facebook login succeeded, got access token: ' + response.authResponse.token);
                    } else {
                        base.popup(MESSAGES.LOGIN_FAIL);
                       // alert('Facebook login failed: ' + response.error);
                    }
                }, {scope: 'email,read_stream,publish_stream'});
    }

    base.getInfo = function() {
        fb.api({
            path: '/me',
            success: function(data) {
                console.log(JSON.stringify(data));
                document.getElementById("userName").innerHTML = data.name;
                document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
            },
            error: base.errorHandler});
    }

    base.share = function() {
        fb.api({
            method: 'POST',
            path: '/me/feed',
            params: {
                message: document.getElementById('Message').value || 'Testing Facebook APIs'
            },
            success: function() {
                base.popup(MESSAGES.SHARE);
               // alert('the item was posted on Facebook');
            },
            error: base.errorHandler});
    }

    base.revoke = function() {
        fb.revokePermissions(
                function() {
                     base.popup(MESSAGES.REVOKE);
                 //   alert('Permissions revoked');
                },
                base.errorHandler);
    }

    base.logout = function() {
        fb.logout(
                function() {
                    // base.popup(MESSAGES.LOGOUT);
                    alert('Logout successful');
                },
                base.errorHandler);
    }

    base.errorHandler = function(error) {
        base.popup(error.message);
      //  alert(error.message);
    }
      // Run initializer
        base.init();
  }  
    $.socialnetz.defaultOptions = {
        
        
    };
    
    $.fn.socialnetz = function(options){
        return this.each(function(){
            (new $.socialnetz(options));
        });
    };
    
})(jQuery);


    
    
        
       


$(document).ready(function(){
       
   $.socialnetz();
 
    
 
    
});


    
