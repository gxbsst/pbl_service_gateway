// 版本访问控制
module.exports = function canAccess(req, res, next) {
  if (!req.socket && sails.config.version.enable && req.headers.accept !== sails.config.version.accept) {
    return res.forbidden('The requested version does not match.');
  }
  next();
}
