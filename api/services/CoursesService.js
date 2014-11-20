var Q = require("q");

module.exports = {

    /**
     * 获取课程数组
     *
     * @param accessToken
     * @returns {*}
     */
    getCourses: function (accessToken) {
        var deferred = Q.defer();
        Course.find({ access_token: accessToken }).exec(function (error, courses) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(courses);
            }
        });
        return deferred.promise;
    },

    /**
     * 获取课程
     *
     * @param id
     * @param accessToken
     * @returns {*}
     */
    getCourse: function (id, accessToken) {
        var deferred = Q.defer();
        Course.findOne({ _id: id, access_token: accessToken }).exec(function (error, courses) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(courses);
            }
        });
        return deferred.promise;
    }
};