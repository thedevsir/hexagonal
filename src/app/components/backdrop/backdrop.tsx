import React, { ComponentType, MouseEventHandler } from 'react';

import styles from './backdrop.module.scss';

export type InjectedBackdropProps = {};

export type BackdropProps = {
  show: boolean;
  onBackdropClick?: MouseEventHandler<HTMLElement>;
};

export const backdrop = <P extends InjectedBackdropProps>(
  WrappedComponent: ComponentType<P>
  // ignored because of typescript issue on generic types spread operation
  // https://github.com/Microsoft/TypeScript/issues/10727
  // @ts-ignore
) => ({ show, onBackdropClick, ...props }: P & BackdropProps) => {
  let backdropElement: HTMLElement;

  const handleBackdropClick: MouseEventHandler<HTMLElement> = event => {
    if (event.target !== backdropElement) {
      return;
    }

    onBackdropClick && onBackdropClick(event); // tslint:disable-line:no-unused-expression
  };

  return show ? (
    <div
      className={styles.backdrop}
      ref={element => (backdropElement = element!)}
      onClick={handleBackdropClick}
    >
      <WrappedComponent {...props} />
    </div>
  ) : null;
};
