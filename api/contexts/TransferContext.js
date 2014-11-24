module.exports = function (from, to, amount) {

  var source = {
      withdraw: function () {
        var text = "Withdraw: " + amount;
        this.log.push(text);
        this.balance -= amount;
        console.log("Balance: " + this.balance);
      }
    },

    destination = {
      deposit: function () {
        var text = "Deposit: " + amount;
        this.log.push(text);
        this.balance += amount;
        console.log("Balance: " + this.balance);
      }
    };

  var sourcePlayer = _.assign(from, source);
  var destinationPlayer = _.assign(to, destination);

  return {
    transfer: function () {
      sourcePlayer.withdraw();
      destinationPlayer.deposit();
      return this;
    }
  };

}
