var express = require('express');
var requestFunction = require('request-promise');
var User = require('../models/user_model.js').User;
var router = express.Router();

module.exports.getUserInfo = function (accessToken) {
    var options = {
        uri: 'https://graph.facebook.com/v3.2/me',
        qs: {
            access_token: accessToken // -> uri + '?access_token=xxxxx%20xxxxx'
        },

        json: true // Automatically parses the JSON string in the response
    };

    return requestFunction(options)
        .then(function (fbUser) {
            var user = new User();
            user.id = fbUser.id;
            user.name = fbUser.name;
            user.email = fbUser.email;
            user.gender = fbUser.gender;
            return user;
        }, function (err) { return err; });
};

function getXXX(callback) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve("qq")
        }, 3000);
    })
}

getXXX().then(function (xx) {

})

// function getXXX(callback) {
//     setTimeout(() => {
//         callback()
//     }, 3000);
// }

// getXXX(function () {
//     // todo
//  })