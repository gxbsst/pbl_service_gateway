/**
 * Chat/SessionController
 *
 * @description :: Server-side logic for managing chat/sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Authentication = require('../../contexts/Authentication');

module.exports = {

  create: function (req, res) {
    if (!req.socket) {
      return;
    }
    var socket = req.socket;
    var session = req.session;
    var socketId = sails.sockets.id(req.socket);

    return res.fill(Authentication.ask(req.body.id, req.body.password).then(function (user) {
      // 创建session.users如果其没有存在的话
      session.users = session.users || {};

      // 将用户（id）放入session，以socket ID为索引
      // 可以在以后通过 socket ID 来查找用户
      session.users[socketId] = user.id;

      // 保存session
      session.save();

      // 订阅(Subscribe)连接的socket到用户自定义消息
      // 此订阅的socket能接收用户的“message”事件
      // 这个可用于用户间发送私密消息
      User.subscribe(socket, user, 'message');
    }));
  },

  destroy: function (req, res) {
    if (!req.socket) {
      return;
    }
    var socketId = sails.sockets.id(req.socket);

    // 从session中删除用户（id）
    req.session.users = req.session.users || {};
    delete req.session.users[socketId];

    // 保存session
    req.session.save();

    res.send(200);
  }

};

