import React, { forwardRef, ReactNode, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Field } from 'formik';
import classNames from 'classnames';

import styles from './checkbox.module.scss';

export type CheckboxProps = {
    name: string;
    label?: ReactNode;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange' | 'onBlur' | 'value' | 'name' | 'type'>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, className, ref, ...rest }) => (
    <label className={styles.container}>
        <Field type="checkbox" className={classNames(styles.checkbox, className)} innerRef={ref} {...rest} />
        {label}
    </label>
));
