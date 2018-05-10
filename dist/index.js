'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _socketManager = require('./socketManager');

var _socketManager2 = _interopRequireDefault(_socketManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.Server(app);
var io = new _socket2.default(server);

var getId = function getId() {
  return Math.random().toString(36).substr(2, 16);
};

app.set('views', _path2.default.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

app.get('/', function (req, res) {
  var roomId = getId();
  var roomData = { roomId: roomId, initiator: true };
  res.render('index', { roomData: roomData });
});

app.get('/game/:roomId', function (req, res) {
  var roomId = req.params.roomId;
  var roomData = { roomId: roomId, initiator: false };
  res.render('index', { roomData: roomData });
});

io.on('connect', _socketManager2.default);

server.listen(3000, function () {
  return console.info('listening on 3000');
});