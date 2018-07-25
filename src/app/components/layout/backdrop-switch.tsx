import React from 'react';
import { Switch } from 'react-router-dom';
import { SwitchProps } from 'react-router';

import { backdrop } from 'app/shared';

export const BackdropSwitch = backdrop<SwitchProps>(props => <Switch {...props} />);
