import React from 'react';
import PropTypes from 'prop-types';

import ResultMessage from './resultMessage/ResultMessage';
import UserIcon from './userIcon/UserIcon';
import OpponentIcon from './opponentIcon/OpponentIcon';
import './GameBoard.css';

const GameBoard = props => {
  return (
    <div className='GameBoard'>
      <OpponentIcon action={props.opponentAction}/>
      <ResultMessage 
        isOpen={props.isResultOpen}
        message={props.resultMessage}
        result={props.result}/>
      <UserIcon action={props.userAction}/>
    </div>
  );
};

GameBoard.propTypes = {
  isResultOpen: PropTypes.bool.isRequired,
  resultMessage: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  userAction: PropTypes.string.isRequired,
  opponentAction: PropTypes.string.isRequired
};

export default GameBoard;