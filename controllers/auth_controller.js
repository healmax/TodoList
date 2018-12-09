var express = require('express');
var passport = require('passport');
var requestFunction = require('request-promise');
var fbRegisterService = require('../services/fb_resiger_service.js');
var User = require('../models/user_model.js').User;
var router = express.Router();


module.exports.checkOAuth = function (request, response) {

    var accessToken = request.body.accessToken;

    fbRegisterService.getUserInfo(accessToken).then(function (user) {
        User.find({ id: user.id }).then(function (dbUser) {
            if (dbUser.length == 0) {
                user.save().then(function () {
                    response.json(user);
                }, function (err) {
                    response.status('403').send('db save user failure');
                    return;
                });
            } else {
                response.json(dbUser[0]);
            }
        }, function (err) {
            response.status('403').send('db access user failure');
        });

    }, function (err) {
        response.status('403').send('access token access failure');
    })
};