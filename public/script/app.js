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
    "FACEBOOK_CLIENT_ID" : "377105592436893",
    "TWITTER_CLIENT_ID" : "SDFA7KP2DOPVNLrSdccgsW2Z8"
}
hello.init({
	github : NETWORK.GITHUB_CLIENT_ID,
    linkedin : NETWORK.LINKEDIN_CLIENT_ID
});

$(document).ready(function(){
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
    
 
  
    $(".login").click(function(e){
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
     });
    
});


    
