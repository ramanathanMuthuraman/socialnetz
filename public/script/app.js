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

    "FACEBOOK_CLIENT_ID": "377105592436893"
};


var MESSAGES = {
    "LOGIN_SUCCESS": "Facebook login succeeded",
    "LOGIN_FAIL": "Facebook login failed",
    "SHARE": "The item was posted on Facebook",
    "REVOKE": "Permissions revoked",
    "LOGOUT": "Logout successful"
};


var privilege = {
    scope: 'email,' +
        'read_stream,' +
        'manage_notifications,' +
        'read_friendlists,' +
        'user_about_me,' +
        'user_events,' +
        'user_groups,' +
        'user_likes,' +
        'user_status,' +
        'user_birthday,' +
        'user_friends,' +
        'user_location,' +
        'user_relationships,' +
        'user_work_history,' +
        'user_education_history,' +
        'user_interests,' +
        'user_photos'
};

(function($) {
    $.socialnetz = function(options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        base.id = 10201804684198526;
        base.init = function() {
            base.options = $.extend({}, $.socialnetz.defaultOptions, options);
            fb.init({
                appId: NETWORK.FACEBOOK_CLIENT_ID
            });
            $(".user-option").on("click", base.loadView);
            $("#fb-btn").on("click", base.status);
            $("#getInfo").on("click", base.getInfo);
            $("#share").on("click", base.share);
            $("#revoke").on("click", base.revoke);
            $("#friends").on("click", base.friends);
            $(document).on("click","#fb-group",base.groupToggle);
            $("#logout").on("click", base.logout);
            base.profile();
            base.home();


            // Put your initialization code here
        };



        base.loadView = function(e) {
            var $el = $(e.currentTarget);
            var view = $el.data('id');
            $(".user-option").removeClass("active");
            $el.addClass("active");
            $('.section-content').addClass("hide")
            $('.section-content[data-section="' + view + '"]').removeClass("hide");
            base[view]();
        };
        base.status = function() {

            if ($("#user-status").data("status") === "inactive") {
                base.login();
            } else {
                base.logout();
            }

        };
        base.profile = function() {
            var opts ={
                "url":"/me",
                "template":"#profile-template",
                "el":".profile-content"
            };
            base.api(opts);
           
        };
        base.home = function() {
             var opts ={
                "url":"/me/home",
                "template":"#home-template",
                "el":".home-content"
            };
            base.api(opts);

        };

        base.friends = function() {
            var opts ={
                "url":"/me/taggable_friends",
                "template":"#friendList-template",
                "el":".friendList-content"
            };
            base.api(opts);

        };
        base.groups = function() {
             var opts ={
                "url":"/me/groups",
                "template":"#groups-template",
                "el":".groups-content"
            };
            base.api(opts);
          
        };
        base.groupToggle = function(e) {
            var $el = $(e.currentTarget);
            var groupid = $el.data('groupid');
            $el.find(".groupMembers-content").collapse('toggle');
            $el.find(".toggle-cue").toggleClass("glyphicon-chevron-right glyphicon-chevron-down");
            if($el.find(".toggle-cue.glyphicon-chevron-down").length){
                base.groupMembers(groupid,$el);
            }
            
        };
        base.groupMembers = function(groupid,$el) {

             var opts ={
                "url":"/"+groupid+"/members",
                "template":"#groupMembers-template",
                "el":".groupMembers-content",
                "context":$el
            };
            base.api(opts);
           

        };
        

        // Defaults to sessionStorage for storing the Facebook token
        //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
        //  fb.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage});
        base.popup = function(msg) {

            $("#feedback-msg").html(msg);
            $('#myModal').modal('show')

        };
        base.login = function() {
            $('#myModal').modal('hide')
            fb.login(
                function(response) {
                    if (response.status === 'connected') {
                        base.popup(MESSAGES.LOGIN_SUCCESS);
                        $("#user-status").data('status', 'active').find(".section-title").html("Logout")
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


        base.api = function(opts) {
            fb.api({
                path: opts.url,
                success: function(data) {
                    base.successHandler(data,opts)
                },
                error: base.errorHandler
            });
        };

        




        base.logout = function() {
            fb.logout(
                function() {
                    base.popup(MESSAGES.LOGOUT);
                    $("#user-status").data('status', 'inactive').find(".section-title").html("Login")
                    $(".login-logout").html("Login");
                    //alert('Logout successful');
                },
                base.errorHandler);
        };

        base.successHandler = function(data,opts) {
            //var source = $("#groupMembers-template").html();
            var source = $(opts.template).html();
            var template = Handlebars.compile(source);
            if(opts.context){
                opts.context.find(opts.el).html(template(data));
            }
            else
            {
                $(opts.el).html(template(data));
            }
            
            //$(".groupMembers-content").html(template(data));
               
        };

         base.errorHandler = function(error) {
                base.popup(error.message);
                //  alert(error.message);
        };
            // Run initializer
        base.init();
    };
    $.socialnetz.defaultOptions = {


    };

    $.fn.socialnetz = function(options) {
        return this.each(function() {
            (new $.socialnetz(options));
        });
    };

})(jQuery);




$(document).ready(function() {

    $.socialnetz();




});