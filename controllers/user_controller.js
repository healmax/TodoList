var express = require('express');
var router = express.Router();
var User = require('../models/user_model.js').User;

module.exports.createUserIfNeeded = function (socialUser, platform) {
    console.log("createUserIfNeeded");
    console.log("socialUser.socialId " + socialUser.socialId);
    return User.find({ facebookId: socialUser.socialId }).then(function (users) {
        if (users.length > 0) {
            return users[0];

        } else {
            var newUser = new User();
            newUser.name = socialUser.name
            newUser.facebookId = socialUser.socialId;
            newUser.gender = socialUser.gender;
            newUser.email = socialUser.email;
            newUser.accessToken = socialUser.accessToken;
            return newUser;

        }

    }, function (err) {
        return err;
    });
};

module.exports.fetchUserByAccessToken = function (accessToken) {
    console.log("fetchUserByAccessToken");
    return User.find({ accessToken: accessToken }).then(function (users) {
        if (users.length > 0) {
            return users[0];
        }

        return null;

    }, function (err) {
        return err;
    });
};