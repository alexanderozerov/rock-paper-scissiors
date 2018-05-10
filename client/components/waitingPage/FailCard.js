import React from 'react';
import PropTypes from 'prop-types';

const message = `It seems We can not connect You to game.
  Game you searched already busy, finished or does not exist.
  You can create you own game room and share game link with 
  you friends.`;

const FailCard = props => {
  return (
    <div className='card-fail'>
      <p className='card-text'>{message}</p>
      <br/>
      <a href={props.url} className='btn btn-info'>
        Go to main page
      </a>
    </div> 
  );
};

FailCard.propTypes = {
  url: PropTypes.string.isRequired
};

export default FailCard;