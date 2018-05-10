import React from 'react';
import PropTypes from 'prop-types';

const WelcomeCard = props => {
  const welcomeTip = `Please input your nickname and click on 
    ${props.initiator ? 'Create' : 'Join'} button to 
    ${props.initiator ? ' create new ' : ' join '} game room.`;

  return (
    <div className='card-welcome'>
      <p className='card-text'>{welcomeTip}</p>
      <input type='text' className='form-control' 
        value={props.nickname}
        onChange={e => props.setNickname(e.target.value)}
      />
      <br/>
      <button className='btn btn-primary form-control' 
        onClick={props.startGame}>
        {props.initiator ? 'Create' : 'Join'}
      </button>
    </div>
  );
};

WelcomeCard.propTypes = {
  initiator: PropTypes.bool.isRequired,
  nickname: PropTypes.string,
  setNickname: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired
};

export default WelcomeCard;