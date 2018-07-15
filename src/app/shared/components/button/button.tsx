import React, { PureComponent, ComponentType } from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

export const enum ButtonModifier {
    Default = 'default',
    Primary = 'primary',
}

export type ComponentProps<C> = C extends React.ComponentType<infer P> | React.Component<infer P> ? P : never;

export type AsProps<A> = A extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[A] : ComponentProps<A>;

export type AsComponent = keyof JSX.IntrinsicElements | ComponentType<any>;

export type ButtonProps<T> = {
    as?: T;
    modifier?: ButtonModifier;
    large?: boolean;
    block?: boolean;
} & AsProps<T>;

export class Button<T extends AsComponent = 'button'> extends PureComponent<ButtonProps<T>> {
    render() {
        // ignored because of typescript issue on generic types spread operation
        // https://github.com/Microsoft/TypeScript/issues/10727
        // @ts-ignore
        const { modifier = ButtonModifier.Default, large, block, className, ...rest } = this.props;

        const As: AsComponent = this.props.as || 'button';

        return (
            <As
                className={classNames(styles.button, styles[modifier], large && styles.large, block && styles.block, className)}
                {...rest}
            />
        );
    }
}
