import React from 'react';
import PropTypes from 'prop-types';

import './ResultMessage.css';

const ResultMessage = props => {
  const style = `ResultMessage card ${props.isOpen ? 'opened' : ''}`;
  return (
    <div className={style}>
      <div className='card-header'>
        <h5 className='text-center'>{props.result}</h5>
      </div>
      <div className='card-body'>
        <p className='card-text'>{props.message}</p>
      </div>
    </div>
  );
};

ResultMessage.propTypes = {
  result: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default ResultMessage;