import React from 'react';
import PropTypes from 'prop-types';

const waitingTip = `We created new game room for you.
  Please provide this url to person 
  you want to invite in new game`;

const WaitingCard = props => {
  return (
    <div className='card-waiting'>
      <p className='card-text'>{waitingTip}</p>
      <br/>
      <input type='text'  className='form-control'
        value={props.url} readOnly
        onClick={e => e.target.select()}/>
    </div> 
  );
};

WaitingCard.propTypes = {
  url: PropTypes.string.isRequired
};

export default WaitingCard;