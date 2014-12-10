module.exports = {

  index: function (req, res) {
    Curriculum.Standard.proxyIndex(req, res);
  },

  show: function (req, res) {
    Curriculum.Standard.proxyShow(req, res);
  },

  create: function (req, res) {
    Curriculum.Standard.proxyCreate(req, res);
  },

  update: function (req, res) {
    Curriculum.Standard.proxyUpdate(req, res);
  },

  destroy: function (req, res) {
    Curriculum.Standard.proxyDestroy(req, res);
  }

};
