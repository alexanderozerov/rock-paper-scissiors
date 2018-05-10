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

class WaitingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'WELCOME'
    };
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('FAIL_CREATE_ROOM', () => {
      this.setState({view: 'FAIL'});
    });
  }

  startGame() {
    const action = this.props.initiator ? 'WAIT_ROOM' : 'CREATE_ROOM';
    this.props.socket.emit(action, {
      nickname: this.props.nickname, 
      roomId: this.props.roomId
    });
    
    if (this.props.initiator) {
      this.setState({view: 'WAITING'});
    }
  }

  render() {
    let view;

    switch (this.state.view) {
    case 'WAITING':
      view = (
        <WaitingCard 
          url={`${this.props.url}/game/${this.props.roomId}`}/>
      );
      break;
    case 'WELCOME':
      view = (
        <WelcomeCard startGame={this.startGame}
          setNickname={this.props.setNickname}
          nickname={this.props.nickname}
          initiator={this.props.initiator}/>
      );
      break;
    case 'FAIL':
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