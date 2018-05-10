import React from 'react';
import PropTypes from 'prop-types';

import './UserIcon.css';

const images = {
  'ROCK': '/img/rock.png',
  'SCISSORS': '/img/scissors.png',
  'PAPER': '/img/paper.png',
  'LIZARD': '/img/lizard.png',
  'SPOCK': '/img/spock.png'
};

const UserIcon = props => {
  const url = images[props.action];
  const className = `UserIcon ${props.action !== '' ? 'active' : ''}`;
  return (
    <div className={className}>
      <img src={url} alt={props.action}/>
    </div>
  );
};

UserIcon.propTypes = {
  action: PropTypes.string.isRequired
};

export default UserIcon;