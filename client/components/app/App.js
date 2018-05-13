import React, {Component} from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import WaitingPage from '../waitingPage/WaitingPage';
import GamePage from '../gamePage/GamePage'; 
import './App.css';

const views = {
  WAITING: 'WAITING',
  GAME: 'GAME'
};

const events = {
  ROOM_CREATED: 'ROOM_CREATED'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(props.url),
      view: views.WAITING,
      nickname: props.roomData.initiator ? 'Player1' : 'Player2',
      opponentNickname: ''
    };
  }

  componentDidMount() {
    const socket = this.state.socket;
    socket.on(events.ROOM_CREATED, data => {
      this.setState({
        view: views.GAME,
        opponentNickname: data.opponentNickname
      });
    });
  }

  render() {
    let view = '';

    switch (this.state.view) {
    case views.WAITING:
      view = (
        <WaitingPage socket={this.state.socket} 
          roomId={this.props.roomData.roomId} 
          url={this.props.url}
          initiator={this.props.roomData.initiator}
          setNickname={nickname => this.setState({nickname})}
          nickname={this.state.nickname}/>
      );
      break;
    case views.GAME: 
      view = (
        <GamePage 
          socket={this.state.socket}
          nickname={this.state.nickname}
          opponentNickname={this.state.opponentNickname}/>
      );
      break;
    }

    return <div>{view}</div>;
  }
}

App.propTypes = {
  roomData: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired
};

export default App;