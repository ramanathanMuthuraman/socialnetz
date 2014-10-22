/**
* Created with git-viewer.
* User: ramanathan
* Date: 2014-10-14
* Time: 11:51 AM
* To change this template use Tools | Templates.
*/
 document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        window.fbAsyncInit = function() {
        FB.init({
          appId      : NETWORK.FACEBOOK_CLIENT_ID,
          xfbml      : true,
          version    : 'v2.1'
        });
         
         FB.login(function(response) {
   if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       alert('Good to see you, ' + response.name + '.');
     });
   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
 });
         
         
        
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    
    }

var NETWORK = {
    "GITHUB_CLIENT_ID": "e693240493ab3060c7cf",
    "LINKEDIN_CLIENT_ID" : "757qomcur069qo",
    "TWITTER_CLIENT_ID" : "JapZ2slFtcAAwbk1Ef1Pyazgt",
    "FACEBOOK_CLIENT_ID" : "377105592436893",
}
hello.init({
	github : NETWORK.GITHUB_CLIENT_ID,
    linkedin : NETWORK.LINKEDIN_CLIENT_ID,
    twitter : NETWORK.TWITTER_CLIENT_ID,
    facebook : NETWORK.FACEBOOK_CLIENT_ID
    
});


var context = {
        "git": {
            "login": "ramanathanMuthuraman",
            "id": 5201881,
            "avatar_url": "https://avatars.githubusercontent.com/u/5201881?v=2",
            "gravatar_id": "",
            "url": "https://api.github.com/users/ramanathanMuthuraman",
            "html_url": "https://github.com/ramanathanMuthuraman",
            "followers_url": "https://api.github.com/users/ramanathanMuthuraman/followers",
            "following_url": "https://api.github.com/users/ramanathanMuthuraman/following{/other_user}",
            "gists_url": "https://api.github.com/users/ramanathanMuthuraman/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/ramanathanMuthuraman/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/ramanathanMuthuraman/subscriptions",
            "organizations_url": "https://api.github.com/users/ramanathanMuthuraman/orgs",
            "repos_url": "https://api.github.com/users/ramanathanMuthuraman/repos",
            "events_url": "https://api.github.com/users/ramanathanMuthuraman/events{/privacy}",
            "received_events_url": "https://api.github.com/users/ramanathanMuthuraman/received_events",
            "type": "User",
            "site_admin": false,
            "name": "",
            "company": "",
            "blog": "",
            "location": "",
            "email": "",
            "hireable": false,
            "bio": null,
            "public_repos": 12,
            "public_gists": 2,
            "followers": 1,
            "following": 3,
            "created_at": "2013-08-10T07:16:56Z",
            "updated_at": "2014-10-19T13:53:37Z"
        }
    };


(function($){
    $.socialnetz = function(options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
      
        base.init = function(){
            base.options = $.extend({},$.socialnetz.defaultOptions, options);
            base.initialView();
            $(window).on('hashchange', base.load);
            $(".status").on("click",base.status);
           
            // Put your initialization code here
        };
        base.status = function (e){
            var $el = $(e.currentTarget);
            if($el.hasClass("login"))
            {
                //proceed to login
                 base.login();
            }
            else
            {
                //proceed to logout
                 base.logout();
            }

        };
        base.initialView = function()
        {
             if(location.hash){
                base.load();
                base.login();
            }
            else{
                location.hash = $(".network-list").eq(0).find("a").attr("href");
            }
        },
        
        // Sample Function, Uncomment to use
         base.load = function(){

            base.network = location.hash.replace("#","");
            $(".network-list").removeClass("active");
            $(".network-content").addClass("hide");
            $("#"+base.network).removeClass("hide");
            $("a[href*='"+base.network+"']").closest("li").addClass("active");
            
            
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
                 $("#"+base.network).find(".status").html("Login").toggleClass("login logout");
               alert("Signed out from" + base.network);
         };
        
        // Sample Function, Uncomment to use
         base.logoutError = function(e){
              alert( "Signed out error:" + base.network +":"+ e.error.message );
         };
        
        // Sample Function, Uncomment to use
         base.login = function(){
            if(!base.isOnline(base.getAuthResponse())){
                hello( base.network ).login({"force":false}).then(base.loginSuccess,base.loginError)
            }
             else{
                 base.profile();
             }
            
         };
        
        // Sample Function, Uncomment to use
         base.loginSuccess = function(){
               alert("You are signed in to "+base.network);

                base.profile();
         };
        
        // Sample Function, Uncomment to use
         base.loginError = function(e){
                alert("Signin error from " + base.network +":"+ e.error.message );
         };
        // Sample Function, Uncomment to use
         base.profile = function(){
              hello( base.network ).api("me").then(base.onProfileSuccess,base.onProfileError)
         };
        
        // Sample Function, Uncomment to use
         base.onProfileSuccess = function(response){
            $("#"+base.network).find(".status").html("Logout").toggleClass("login logout");
            var source   = $("#profile-template").html();
            var template = Handlebars.compile(source);
            var html    = $("#"+base.network).find(".profile-content").html(template(response));
         };
        
        // Sample Function, Uncomment to use
         base.onProfileError = function(e){
                alert("Fetch profile error from " + base.network +":"+ e.error.message );
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
    
   
    
  // $.socialnetz();
 
    
 
    
});


    
