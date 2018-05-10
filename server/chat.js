class Chat {
  constructor(roomName, clients) {
    this.roomName = roomName;
    clients.forEach(client => client.join(roomName));
    this.history = [];
  }

  sendMessage(message, client) {
    this.history = [...this.history, message];
    client.to(this.roomName).emit(
      'RECEIVE_MESSAGE', 
      {author: client.nickname, message}
    );
  }

  typeMessage(client) {
    client.to(this.roomName).emit(
      'TYPE_MESSAGE', 
      client.nickname
    );
  }
}

export default Chat;