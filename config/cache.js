/*
Redis cache

var _ = require('lodash');
var redis = require('redis');

var client = redis.createClient();

module.exports = {

    expire: 60 * 60,

    set: function (key, value, callback) {
        client.setex(key, this.expire, value, function (err) {
            if (err) console.error(err);
            if (_.isFunction(callback)) callback(err, value);
        });
    },

    get: function (key, callback) {
        client.get(key, function(err, val) {
            if (err) console.error(err);
            if (_.isFunction(callback)) callback(err, val);
        });
    },

    del: function (key, callback) {
        client.del(key, function(err) {
            if (err) console.error(err);
            if (_.isFunction(callback)) callback(err);
        });
    }
};*/
