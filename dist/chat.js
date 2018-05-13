'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = function () {
  function Chat(roomName, clients) {
    _classCallCheck(this, Chat);

    this.roomName = roomName;
    clients.forEach(function (client) {
      return client.join(roomName);
    });
    this.history = [];
  }

  _createClass(Chat, [{
    key: 'sendMessage',
    value: function sendMessage(message, client) {
      this.history = [].concat(_toConsumableArray(this.history), [message]);
      client.to(this.roomName).emit(_constants2.default.RECEIVE_MESSAGE, { author: client.nickname, message: message });
    }
  }, {
    key: 'typeMessage',
    value: function typeMessage(client) {
      client.to(this.roomName).emit(_constants2.default.TYPE_MESSAGE, client.nickname);
    }
  }]);

  return Chat;
}();

exports.default = Chat;