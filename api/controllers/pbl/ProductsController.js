
module.exports = {

  index: function (req, res) {
    Pbl.Product.proxyIndex(req, res);
  },

  show: function (req, res) {
    Pbl.Product.proxyShow(req, res);
  },

  create: function (req, res) {
    Pbl.Product.proxyCreate(req, res);
  },

  update: function (req, res) {
    Pbl.Product.proxyUpdate(req, res);
  },

  destroy: function (req, res) {
    Pbl.Product.proxyDestroy(req, res);
  }

};
