import React from 'react';
import {render} from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/app/App';
import config from './config';

render(
  <App roomData={window.roomData} url={config.url}/>, 
  document.getElementById('root')
);