module.exports = {

  index: function (req, res) {
    Gauge.proxyIndex(req, res);
  },

  show: function (req, res) {
    Gauge.proxyShow(req, res);
  },

  create: function (req, res) {
    Gauge.proxyCreate(req, res);
  },

  update: function (req, res) {
    Gauge.proxyUpdate(req, res);
  },

  destroy: function (req, res) {
    Gauge.proxyDestroy(req, res);
  }

};
