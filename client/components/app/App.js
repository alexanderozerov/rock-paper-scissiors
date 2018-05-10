import React, {Component} from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import WaitingPage from '../waitingPage/WaitingPage';
import GamePage from '../gamePage/GamePage'; 
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(props.url),
      view: 'WAITING_PAGE',
      nickname: props.roomData.initiator ? 'Player1' : 'Player2',
      opponentNickname: ''
    };
  }

  componentDidMount() {
    const socket = this.state.socket;
    socket.on('ROOM_CREATED', data => {
      this.setState({
        view: 'GAME_PAGE',
        opponentNickname: data.opponentNickname
      });
    });
  }

  render() {
    let view = '';

    switch (this.state.view) {
    case 'WAITING_PAGE':
      view = (
        <WaitingPage socket={this.state.socket} 
          roomId={this.props.roomData.roomId} 
          url={this.props.url}
          initiator={this.props.roomData.initiator}
          setNickname={nickname => this.setState({nickname})}
          nickname={this.state.nickname}/>
      );
      break;
    case 'GAME_PAGE': 
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