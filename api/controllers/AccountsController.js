var transferContext = require("../contexts/TransferContext");

module.exports = {

  transfer: function (req, res) {
    var from = {
      log: [],
      balance: 100
    }, to = {
      log: [],
      balance: 0
    };

    transferContext(from, to, 25).transfer();

    return res.json({
      account: 'to',
      balance: to.balance
    });
  }
};
