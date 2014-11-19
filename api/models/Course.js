/**
 * Course.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

    },

    getCourses: function (accessToken, callback) {
        Course.find({ access_token: accessToken }).exec(function (error, courses) {
            if (error) return callback(error);
            callback(null, courses);
        });
    }
};

