import React from 'react';
import PropTypes from 'prop-types';

import Game from './game/Game';
import Chat from './chat/Chat';

const GamePage = props => {
  return (
    <div className='GamePage container-fluid'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <Game 
            socket={props.socket}
            nickname={props.nickname}
            opponentNickname={props.opponentNickname}/>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <Chat socket={props.socket}
            nickname={props.nickname}/>
        </div>
      </div>
    </div>
  );
};

GamePage.propTypes = {
  socket: PropTypes.object.isRequired,
  nickname: PropTypes.string,
  opponentNickname: PropTypes.string
};

export default GamePage;