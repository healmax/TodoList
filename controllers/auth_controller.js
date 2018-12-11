const rp = require('request-promise');
const SocialUser = require('../models/social_user_model.js').SocialUser;
const userController = require('./user_controller');

const SocialPlatform = {
    Facebook: 0,
    Twitter: 1,
}

module.exports.checkOAuthAndCreateUserIfNeeded = function (request, response) {
    var accessToken = request.body.accessToken;
    var platform = request.body.platform;

    checkOAuthAndFetchSocialUser(accessToken, platform).then(function (socialUser) {
        userController.createUserIfNeeded(socialUser).then(function (user) {
            user.save().then(function (err) {
                user.accessToken = undefined;
                response.setHeader('accessToken', socialUser.accessToken);
                response.json(user);
            });
        }, function (err) {
            response.status('403').send('create user failure');
        });

    }, function (err) {
        response.status('403').send('access token access failure');
    });
};

const checkOAuthAndFetchSocialUser = function (accessToken, platform) {
    switch (platform) {
        case SocialPlatform.Facebook:
            return checkOAuthAndFetchFBSocialUser(accessToken, platform);
            break;
        case SocialPlatform.Twitter:
            // Motica TODO
            break;
    }
}

const checkOAuthAndFetchFBSocialUser = function (accessToken, platform) {
    var options = {
        uri: 'https://graph.facebook.com/v3.2/me',
        qs: {
            access_token: accessToken // -> uri + '?access_token=xxxxx%20xxxxx'
        },

        json: true // Automatically parses the JSON string in the response
    };

    return rp(options)
        .then(function (fbUser) {
            console.log("checkOAuthAndFetchSocialUser ");
            console.log(fbUser);
            var socialUser = new SocialUser();
            socialUser.socialId = fbUser.id;
            socialUser.name = fbUser.name;
            socialUser.email = fbUser.email;
            socialUser.gender = fbUser.gender;
            socialUser.accessToken = accessToken;
            return socialUser;
        }, function (err) {
            console.log("checkOAuthAndFetchSocialUser error");
            return err;
        });
}