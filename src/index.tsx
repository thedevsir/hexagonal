import React from 'react';
import { render } from 'react-dom';

import { App } from './app';
import { register } from './sw';
import './index.scss';

render(<App />, document.getElementById('root') as HTMLElement);
register();
