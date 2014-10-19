/**
* Created with git-viewer.
* User: ramanathan
* Date: 2014-10-14
* Time: 11:51 AM
* To change this template use Tools | Templates.
*/

var NETWORK = {
    "GITHUB_CLIENT_ID": "e693240493ab3060c7cf",
    "LINKEDIN_CLIENT_ID" : "757qomcur069qo",
    "TWITTER_CLIENT_ID" : "SDFA7KP2DOPVNLrSdccgsW2Z8",
    "FACEBOOK_CLIENT_ID" : "377105592436893",
}
hello.init({
	github : NETWORK.GITHUB_CLIENT_ID,
    linkedin : NETWORK.LINKEDIN_CLIENT_ID,
    twitter : NETWORK.TWITTER_CLIENT_ID,
    facebook : NETWORK.FACEBOOK_CLIENT_ID
    
});


(function($){
    $.socialnetz = function(options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
      
        base.init = function(){
            base.options = $.extend({},$.socialnetz.defaultOptions, options);
            $(window).on('hashchange', base.load);
            // Put your initialization code here
        };
        
        // Sample Function, Uncomment to use
         base.load = function(){
            base.network = location.hash.replace("#","");
            base.login();
         };
        
         // Sample Function, Uncomment to use
         base.isOnline = function(session){
            var current_time = (new Date()).getTime() / 1000;
            return session && session.access_token && session.expires > current_time;
         };
        
        // Sample Function, Uncomment to use
         base.getAuthResponse = function(){
            return hello( base.network ).getAuthResponse();
         };
        
        // Sample Function, Uncomment to use
         base.logout = function(){
              hello( base.network ).logout().then( base.logoutSuccess,base.logoutError);
         };
        
        // Sample Function, Uncomment to use
         base.logoutSuccess = function(){
               alert("Signed out from" + base.network);
         };
        
        // Sample Function, Uncomment to use
         base.logoutError = function(e){
              alert( "Signed out error:" + base.network +":"+ e.error.message );
         };
        
        // Sample Function, Uncomment to use
         base.login = function(){
            if(!base.isOnline(base.getAuthResponse())){
                hello( base.network ).login().then(base.loginSuccess,base.loginError)
            }
            
         };
        
        // Sample Function, Uncomment to use
         base.loginSuccess = function(){
               alert("You are signed in to "+base.network);
         };
        
        // Sample Function, Uncomment to use
         base.loginError = function(e){
                alert("Signin error from " + base.network +":"+ e.error.message );
         };
        // Sample Function, Uncomment to use
         base.fetchProfile = function(){
              hello( base.network ).api("me").then(base.onSuccess,base.onError)
         };
        // Run initializer
        base.init();
    };
    
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
    /*
     *check if the user is online or not
     */
    var online = function(session){
    var current_time = (new Date()).getTime() / 1000;
    return session && session.access_token && session.expires > current_time;
    };
    var fetchDataFromGithub = function()
    {
         //get github profile
          hello( "github" ).api("me").then(function(p){
			$("#network").html("<img src='"+ p.thumbnail + "' width=24/>Connected as "+ p.name);
		}, function( e ){
                 alert("Signin error: " + e.error.message );
            });
         //get github profile
    };
    
 
  
    /*$(".login").click(function(e){
    var network = $(e.currentTarget).data("network");
    if(!online(hello( network ).getAuthResponse())){
        hello( $(this).data("network")).login().then( function(){
            alert("You are signed in to "+network);


        }, function( e ){
            alert("Signin error from: " + network +":"+ e.error.message );
        });
    }
    });
    
     $(".logout").click(function(e){
     var network = $(e.currentTarget).data("network");
        hello( network ).logout().then( function(){
            alert("Signed out from" + network);
        }, function(e){
            alert( "Signed out error:" + network +":"+ e.error.message );
        });
     });*/
    
});


    
