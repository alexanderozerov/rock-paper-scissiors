import React, {Component} from 'react';
import PropTypes from 'prop-types';

import WaitingCard from './WaitingCard';
import WelcomeCard from './WelcomeCard';
import FailCard from './FailCard';
import './WaitingPage.css';

const rules = `Scissors cuts Paper, Paper covers Rock, 
  Rock crushes Lizard, Lizard poisons Spock, 
  Spock smashes Scissors, Scissors decapitates Lizard, 
  Lizard eats Paper, Paper disproves Spock,
  Spock vaporizes Rock, (and as it always has) 
  Rock crushes Scissors`;

const views = {
  WELCOME: 'WELCOME',
  FAIL: 'FAIL',
  WAITING: 'WAITING'
};

const events = {
  WAIT_ROOM: 'WAIT_ROOM',
  CREATE_ROOM: 'CREATE_ROOM',
  FAIL_CREATE_ROOM: 'FAIL_CREATE_ROOM'
};

class WaitingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: views.WELCOME
    };
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    this.props.socket.on(events.FAIL_CREATE_ROOM, () => {
      this.setState({view: views.FAIL});
    });
  }

  startGame() {
    const action = this.props.initiator ? 
      events.WAIT_ROOM : events.CREATE_ROOM;
    this.props.socket.emit(action, {
      nickname: this.props.nickname, 
      roomId: this.props.roomId
    });
    
    if (this.props.initiator) {
      this.setState({view: views.WAITING});
    }
  }

  render() {
    let view;

    switch (this.state.view) {
    case views.WAITING:
      view = (
        <WaitingCard 
          url={`${this.props.url}/game/${this.props.roomId}`}/>
      );
      break;
    case views.WELCOME:
      view = (
        <WelcomeCard startGame={this.startGame}
          setNickname={this.props.setNickname}
          nickname={this.props.nickname}
          initiator={this.props.initiator}/>
      );
      break;
    case views.FAIL:
      view = <FailCard url={this.props.url} />;
      break;
    }

    return (
      <div className='WaitingPage container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-md-6 col-lg-4'>
            <div className='card'>
              <div className='card-header'>
                <h4 className='card-title text-center'>
                  Welcome to Rock Paper Scissors Lizard Spock game
                </h4>
              </div>
              <div className='card-body'>{view}</div>
              <div className='card-footer'>
                <h4>Rules</h4>
                <p className='card-text'>{rules}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

WaitingPage.propTypes = {
  socket: PropTypes.object.isRequired,
  initiator: PropTypes.bool.isRequired,
  roomId: PropTypes.string.isRequired,
  nickname: PropTypes.string,
  setNickname: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

export default WaitingPage;