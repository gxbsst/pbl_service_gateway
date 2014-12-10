module.exports = {

  index: function (req, res) {
    Curriculum.Curriculum.proxyIndex(req, res);
  },

  show: function (req, res) {
    Curriculum.Curriculum.proxyShow(req, res);
  },

  create: function (req, res) {
    Curriculum.Curriculum.proxyCreate(req, res);
  },

  update: function (req, res) {
    Curriculum.Curriculum.proxyUpdate(req, res);
  },

  destroy: function (req, res) {
    Curriculum.Curriculum.proxyDestroy(req, res);
  }

};
