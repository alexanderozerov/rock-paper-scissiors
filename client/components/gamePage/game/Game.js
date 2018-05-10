import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {soundManager} from 'soundmanager2';

import ScorePanel from './scorePanel/ScorePanel';
import GameBoard from './gameBoard/GameBoard';
import IconPanel from './iconPanel/IconPanel';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: [0, 0],
      result: '',
      isResultOpen: false,
      resultMessage: 'Scissorc cut paper',
      win: false,
      userAction: '',
      opponentAction: ''
    };
    this.makeMove = this.makeMove.bind(this);
    this.showResult = this.showResult.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('GAME_RESULT', result => {
      this.showResult(result);
    });

    this.setState({
      resultSound: soundManager.createSound({url: '/mp3/result.mp3'})
    });
  }

  makeMove(action) {
    this.setState({userAction: action});
    this.props.socket.emit('NEXT_MOVE', action);
  }

  showResult(result) {
    this.state.resultSound.play();
    this.setState({
      isResultOpen: true, 
      resultMessage: result.message,
      score: result.score,
      opponentAction: result.opponentAction,
      result: result.result
    });
    setTimeout(() => this.setState({
      isResultOpen: false,
      userAction: '',
      opponentAction: '',
      result: ''
    }), 3000);
  }

  render() {
    return (
      <div className='Game'>
        <ScorePanel 
          score={this.state.score} 
          nickname={this.props.nickname}
          opponentNickname={this.props.opponentNickname}/>
        <GameBoard 
          isResultOpen={this.state.isResultOpen}
          result={this.state.result}
          resultMessage={this.state.resultMessage}
          userAction={this.state.userAction}
          opponentAction={this.state.opponentAction}/>
        <IconPanel handleClick={this.makeMove}/>
      </div>
    );
  }
}

Game.propTypes = {
  nickname: PropTypes.string,
  opponentNickname: PropTypes.string,
  socket: PropTypes.object.isRequired
};

export default Game;