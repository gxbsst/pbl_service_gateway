// 版本访问控制
module.exports = function canAccess(req, res, next) {
  if (req.headers.accept !== sails.config.version.accept) {
    return res.notFound();
  }
  next();
}
