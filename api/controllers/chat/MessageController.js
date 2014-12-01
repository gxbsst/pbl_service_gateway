/**
 * Chat/MessageController.jsController
 *
 * @description :: Server-side logic for managing chat/messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function (req, res) {
    // Get the ID of the currently connected socket
    var socketId = sails.sockets.id(req.socket);

    // 发布一个消息到用户的“房间”。
    // 只有订阅了用户消息的socket才能获取消息
    User.message(req.body.to, {
      from: req.session.users[socketId],
      msg: req.body.msg
    });

    res.send(200);
  }

};

