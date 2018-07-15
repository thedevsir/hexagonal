import React, { forwardRef } from 'react';
import { Field, FieldProps } from 'formik';
import classNames from 'classnames';

import styles from './input.module.scss';

export type InputProps = {
    name: string;
    label?: string;
    hint?: string;
    large?: boolean;
} & Omit<JSX.IntrinsicElements['input'], 'onChange' | 'onBlur' | 'value' | 'name'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ name, label, hint, large = false, ref, ...rest }) => (
    <Field name={name}>
        {({ field, form: { touched, errors } }: FieldProps) => {
            const error = errors[field.name];
            const hasError = touched[field.name] && error;

            return (
                <div className={classNames(styles.container, hasError && styles.error, large && styles.large)}>
                    {label && (
                        <label className={styles.label} htmlFor={name}>
                            {label}
                        </label>
                    )}
                    <input className={classNames(styles.input, hasError && styles.error)} ref={ref} {...rest} {...field} />
                    {(hasError || hint) && <p className={styles.message}>{hasError ? error : hint}</p>}
                </div>
            );
        }}
    </Field>
));
