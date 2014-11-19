var Q = require("q");

module.exports = {
    getCourses: function (accessToken) {
        var deferred = Q.defer();
        Course.getCourses(accessToken, deferred.makeNodeResolver());
        return deferred.promise;
    }
};