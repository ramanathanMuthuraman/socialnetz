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


var privilege = {
        scope: 'email,'+
                'read_stream,'+
                'manage_notifications,'+
                'read_friendlists,'+
                'user_about_me,'+
                'user_events,'+
                'user_groups,'+
                'user_likes,'+
                'user_status,'+
                'user_birthday,'+
                'user_friends,'+
                'user_location,'+
                'user_relationships,'+
                'user_work_history,'+
                'user_education_history,'+
                'user_interests,'+
                'user_photos'
    };

(function($){
    $.socialnetz = function(options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        base.id = 10201804684198526;
        base.init = function(){
            base.options = $.extend({},$.socialnetz.defaultOptions, options);
            fb.init({appId: NETWORK.FACEBOOK_CLIENT_ID});
            $(".user-option").on("click",base.loadView);
            $("#fb-btn").on("click",base.status);
            $("#getInfo").on("click",base.getInfo);
            $("#share").on("click",base.share);
            $("#revoke").on("click",base.revoke);
            $("#friends").on("click",base.friends);
            $("#logout").on("click",base.logout);
         
           
           
            // Put your initialization code here
        };
        

       
   base.loadView = function (e)
    {
        var $el = $(e.currentTarget);
        var view = $el.data('id');   
        $(".user-option").removeClass("active");
        $el.addClass("active");
        $('.section-content').addClass("hide")
        $('.section-content[data-section="'+view+'"]').removeClass("hide");
    };
     base.status = function(){

       if($("#user-status").data("status")==="inactive"){
            base.login();
       }
       else{
        base.logout();
       }

     };    
   

    // Defaults to sessionStorage for storing the Facebook token
    //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
    //  fb.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage});
     base.popup = function (msg){

        $("#feedback-msg").html(msg);
        $('#myModal').modal('show')

     };
     base.login = function() {
         $('#myModal').modal('hide')
        fb.login(
                function(response) {
                    if(response.status === 'connected') {
                        base.popup(MESSAGES.LOGIN_SUCCESS);
                        $("#user-status").data('status','active').find(".section-title").html("Logout")
                        $(".login-logout").html("Logout");
                        $(".user-option[data-id='profile']").trigger("click");
                       // alert('Facebook login succeeded, got access token: ' + response.authResponse.token);
                    } else {
                        base.popup(MESSAGES.LOGIN_FAIL);
                        $("#user-status").addClass("inactive").removeClass("active").html("login");
                       // alert('Facebook login failed: ' + response.error);
                    }
                }, privilege);
    };

    base.getInfo = function() {
        fb.api({
            path: '/me',
            success: function(data) {
                console.log(JSON.stringify(data));
                document.getElementById("userName").innerHTML = data.name;
                document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
            },
            error: base.errorHandler});
    };

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
    };

    base.revoke = function() {
        fb.revokePermissions(
                function() {
                     base.popup(MESSAGES.REVOKE);
                 //   alert('Permissions revoked');
                },
                base.errorHandler);
    };

    base.friends = function() {


        fb.api({path: '/me/friendlists', success: base.friendsSuccess, error: base.friendsError});

    };

    base.friendsSuccess =  function (data) {

         console.log(JSON.stringify(data));
    };

    base.friendsError =  function (error) {

        base.errorHandler(error.message);
    };
    base.logout = function() {
        fb.logout(
                function() {
                    base.popup(MESSAGES.LOGOUT);
                    $("#user-status").data('status','inactive').find(".section-title").html("Login")
                        $(".login-logout").html("Login");
                    //alert('Logout successful');
                },
                base.errorHandler);
    };

    base.errorHandler = function(error) {
        base.popup(error.message);
      //  alert(error.message);
    }
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
 
    
 
    
});


    
