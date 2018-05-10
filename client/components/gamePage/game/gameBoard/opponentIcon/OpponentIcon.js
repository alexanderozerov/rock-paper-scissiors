import React from 'react';
import PropTypes from 'prop-types';

import './OpponentIcon.css';

const images = {
  'ROCK': '/img/rock.png',
  'SCISSORS': '/img/scissors.png',
  'PAPER': '/img/paper.png',
  'LIZARD': '/img/lizard.png',
  'SPOCK': '/img/spock.png',
  '': '/img/question.png'
};

const OpponentIcon = props => {
  const url = images[props.action];
  return (
    <div className='OpponentIcon'>
      <img src={url} alt={props.action}/>
    </div>
  );
};

OpponentIcon.propTypes = {
  action: PropTypes.string.isRequired
};

export default OpponentIcon;