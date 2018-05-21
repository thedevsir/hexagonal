import React, { SFC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export const BackdropLink: SFC<LinkProps> = ({ to, ...rest }) => (
  <Link
    to={
      typeof to === 'string'
        ? {
            pathname: to,
            state: { backdrop: true },
          }
        : {
            ...to,
            state: {
              ...to.state,
              backdrop: true,
            },
          }
    }
    {...rest}
  />
);
