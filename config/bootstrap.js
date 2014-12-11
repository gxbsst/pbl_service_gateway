/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {

  var expansion = {
    autoCreatedAt: false,
    autoUpdatedAt: false,

    proxyIndex: function (req, res) {
      return res.fill(this.find(req.query));
    },

    proxyShow: function (req, res) {
      return res.fill(this.findOne(_.merge({_id: req.param('id')}, req.query)));
    },

    proxyCreate: function (req, res) {
      return res.fill(this.create(req.body[this.resource]));
    },

    proxyUpdate: function (req, res) {
      return this.updateOne({where: {_id: req.param('id')}}, req.body[this.resource], function (err, data) {
        if (err) {
          return res.json(err.code, err.meta.data);
        }
        return res.json(data);
      });
    },

    proxyDestroy: function (req, res) {
      return res.fill(this.destroy({_id: req.param('id')}));
    }
  };

  _.each(sails.models, function eachModel(model) {
    // namespace hook
    var array = model.globalId.split('.');
    if (array.length === 2) {
      model.namespace = array[0].toLowerCase();
      model.resource = array[1].toLowerCase();

      global[array[0]] = global[array[0]] || {};
      global[array[0]][array[1]] = model;
    } else {
      model.resource = array[0].toLowerCase();
    }

    // 扩展model
    _.extend(model, expansion);
  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
