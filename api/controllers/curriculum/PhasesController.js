module.exports = {

  index: function (req, res) {
    Curriculum.Phase.proxyIndex(req, res);
  },

  show: function (req, res) {
    Curriculum.Phase.proxyShow(req, res);
  },

  create: function (req, res) {
    Curriculum.Phase.proxyCreate(req, res);
  },

  update: function (req, res) {
    Curriculum.Phase.proxyUpdate(req, res);
  },

  destroy: function (req, res) {
    Curriculum.Phase.proxyDestroy(req, res);
  }

};
