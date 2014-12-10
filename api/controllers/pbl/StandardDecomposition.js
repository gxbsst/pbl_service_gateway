module.exports = {

  index: function (req, res) {
    Pbl.StandardDecomposition.proxyIndex(req, res);
  },

  show: function (req, res) {
    Pbl.StandardDecomposition.proxyShow(req, res);
  },

  create: function (req, res) {
    Pbl.StandardDecomposition.proxyCreate(req, res);
  },

  update: function (req, res) {
    Pbl.StandardDecomposition.proxyUpdate(req, res);
  },

  destroy: function (req, res) {
    Pbl.StandardDecomposition.proxyDestroy(req, res);
  }

};
