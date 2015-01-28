module.exports = {

  resource: 'Todo.TodoItem',

  complete: function (req, res) {
    return res.fill(Todo.TodoItem.$$action({method: 'update', action: 'complete', where: {_id: req.param('id')}}));
  },
  cancel_complete: function (req, res) {
    return res.fill(Todo.TodoItem.$$action({method: 'update', action: 'cancel_complete', where: {_id: req.param('id')}}));
  }

};

