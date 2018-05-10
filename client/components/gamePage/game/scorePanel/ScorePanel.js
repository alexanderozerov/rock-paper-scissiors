import React from 'react';
import PropTypes from 'prop-types';

import './ScorePanel.css';

const ScorePanel = props => {
  return (
    <div className='ScorePanel'>
      <h2>
        <div className='score-header'>
          <div className='score-block'>
            {props.opponentNickname}
          </div>
          <div className='score-block'>Score</div>
          <div className='score-block'>{props.nickname}</div>
        </div>
        <div>{props.score[0]} : {props.score[1]}</div>
      </h2>
    </div>
  );
};

ScorePanel.propTypes = {
  score: PropTypes.array.isRequired,
  nickname: PropTypes.string,
  opponentNickname: PropTypes.string
};

export default ScorePanel;