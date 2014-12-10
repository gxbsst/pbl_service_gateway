module.exports = {

  index: function (req, res) {
    Curriculum.Subject.proxyIndex(req, res);
  },

  show: function (req, res) {
    Curriculum.Subject.proxyShow(req, res);
  },

  create: function (req, res) {
    Curriculum.Subject.proxyCreate(req, res);
  },

  update: function (req, res) {
    Curriculum.Subject.proxyUpdate(req, res);
  },

  destroy: function (req, res) {
    Curriculum.Subject.proxyDestroy(req, res);
  }

};
