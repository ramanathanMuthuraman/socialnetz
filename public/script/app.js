/**
 * Created with socialnetz.
 * User: ramanathan
 * Date: 2014-10-14
 * Time: 11:51 AM
 * To change this template use Tools | Templates.
 */


var NETWORK = {

    "FACEBOOK_CLIENT_ID": "377105592436893"
};


var MESSAGES = {
    "LOGIN_SUCCESS": "Facebook login succeeded",
    "LOGIN_FAIL": "Facebook login failed",
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
        base.init = function() {
            base.options = $.extend({}, $.socialnetz.defaultOptions, options);
            fb.init({
                appId: NETWORK.FACEBOOK_CLIENT_ID
            });
            $(".user-option").on("click", base.loadView);
            $("#fb-btn").on("click", base.status);
            $("#fb-settings-btn").on("click", base.revoke);
            $("#getInfo").on("click", base.getInfo);
            $("#share").on("click", base.share);
            $("#revoke").on("click", base.revoke);
            $("#friends").on("click", base.friends);
            $(document).on("click",".fb-group",base.groupToggle);
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

            if ($("#fb-btn").data("status") === "inactive") {
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
                "url":"/me/feed",
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
                        $("#fb-btn").data('status', 'active');
                        $(".login-logout").html("Logout from");
                        $(".user-option[data-id='profile']").trigger("click");

                    
                    } else {
                        base.popup(MESSAGES.LOGIN_FAIL);
                     
                    }
                }, privilege);
        };

         base.revoke = function() {
            fb.revokePermissions(
                function() {
                     base.popup(MESSAGES.REVOKE);
                },
                base.errorHandler);
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
                    $("#fb-btn").data('status', 'inactive');
                    $(".login-logout").html("Login with");


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
            /*set the profile image*/
            if($("#header-profile-img").attr("src"))
            {
                $("#header-profile-img").attr("src","http://graph.facebook.com/"+data.id+"/picture?type=small");
            }
            
               
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