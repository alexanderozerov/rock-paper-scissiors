import Game from './Game';
import Chat from './Chat';
import constants from './constants';

const waitingClients = new Map();

const socketManager = socket => {

  console.info(`New connection ${socket.id}`);

  socket.on(constants.WAIT_ROOM, data => {
    console.info(`${data.nickname} wait second player`);
    socket.nickname = data.nickname;
    waitingClients.set(data.roomId, socket);
  });

  socket.on(constants.CREATE_ROOM, data => {
    console.info(`${data.nickname} created room`);

    socket.nickname = data.nickname;

    if (!waitingClients.has(data.roomId)) {
      console.info('failed to join game');
      socket.emit(
        constants.FAIL_CREATE_ROOM, 
        'Game room already busy or does not exist'
      );
      return;
    }

    const initiator = waitingClients.get(data.roomId);
    waitingClients.delete(data.roomId);
    createRoom(initiator, socket, data.roomId);
  });
};

const createRoom = (client1, client2, roomName) => {
  const chat = new Chat(roomName, [client1, client2]);
  const game = new Game(client1, client2);

  [client1, client2].forEach(client => {
    client.on(constants.SEND_MESSAGE, message => {
      console.info(`${client.nickname} sends message`);
      chat.sendMessage(message, client);
    });

    client.on(constants.TYPE_MESSAGE, () => {
      chat.typeMessage(client);
    });

    client.on('disconnect', () => {
      chat.sendMessage('Left this room', client);
    });

    client.on(constants.NEXT_MOVE, action => {
      console.info(`${client.nickname} picked ${action}`);
      game.nextMove(action, client);
    });
  });

  client1.emit(
    constants.ROOM_CREATED, 
    {roomName, opponentNickname: client2.nickname}
  );

  client2.emit(
    constants.ROOM_CREATED, 
    {roomName, opponentNickname: client1.nickname}
  );
};

export default socketManager;

