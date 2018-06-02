import React, { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Field, FieldProps } from 'formik';
import classNames from 'classnames';

import styles from './input.module.scss';

export type InputProps = { name: string } & Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'onChange' | 'onBlur' | 'value' | 'name'
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ name, ref, ...rest }) => {
    return (
        <div className={styles.container}>
            <Field name={name}>
                {({ field, form: { touched, errors } }: FieldProps) => {
                    const error = errors[field.name];
                    const hasError = touched[field.name] && error;

                    return (
                        <>
                            <input className={classNames(styles.input, hasError && styles.error)} ref={ref} {...rest} {...field} />
                            {hasError && <p className={styles.errorMessage}>{error}</p>}
                        </>
                    );
                }}
            </Field>
        </div>
    );
});
