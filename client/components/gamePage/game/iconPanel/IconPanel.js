import React from 'react';
import PropTypes from 'prop-types';
import {soundManager} from 'soundmanager2';

import './IconPanel.css';

soundManager.setup({
  debugMode: false
});

const IconPanel = props => {

  const clickSound = soundManager.createSound({
    url: '/mp3/click.mp3'
  });

  const pickIcon = e => {
    clickSound.play();

    const icon = e.target;
    icon.classList.add('active');
    const action = icon.getAttribute('data-action');
    props.handleClick(action);
    setTimeout(() => icon.classList.remove('active'), 1000);
  };

  return (
    <div className='IconPanel' onClick={pickIcon}>
      <div className='btn-icon rock' data-action='ROCK'></div>
      <div className='btn-icon scissors' data-action='SCISSORS'></div>
      <div className='btn-icon paper' data-action='PAPER'></div>
      <div className='btn-icon lizard' data-action='LIZARD'></div>
      <div className='btn-icon spock' data-action='SPOCK'></div>
    </div>
  );
};

IconPanel.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default IconPanel;