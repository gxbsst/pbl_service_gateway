var Q = require("q");

module.exports = {

  makePromiseByExec: function (executor) {
    var deferred = Q.defer();
    executor.exec(deferred.makeNodeResolver());
    return deferred.promise;
  }
};
