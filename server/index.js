import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import path from 'path';

import socketManager from './socketManager';

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);

const getId = () => Math.random().toString(36).substr(2, 16);

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  const roomId = getId();
  const roomData = {roomId, initiator: true};
  res.render('index', {roomData});
});

app.get('/game/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const roomData = {roomId, initiator: false};
  res.render('index', {roomData});
});

io.on('connect', socketManager);

server.listen(3000, () => console.info('listening on 3000'));