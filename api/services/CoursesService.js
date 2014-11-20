var Q = require("q");

module.exports = {

    /**
     * 返回一个promise对于controller可以简化处理
     *
     * @param accessToken
     * @returns {*}
     */
    getCourses: function (accessToken) {
        var deferred = Q.defer();
        Course.getCourses(accessToken, deferred.makeNodeResolver());
        return deferred.promise;
    }
};