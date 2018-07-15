import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Input, Button, ButtonModifier } from 'app/shared';
import { UsersApi } from 'app/screens/settings/screens/profile/shared';

import styles from './password.module.scss';
import { getFormStatusAndErrors } from 'utils';

export const Password = () => {
    return (
        <Formik
            initialValues={{
                newPassword: '',
                password: '',
            }}
            validationSchema={Yup.object().shape({
                newPassword: Yup.string()
                    .required()
                    .min(8)
                    .notOneOf([Yup.ref('password')], 'passwords are completely identical')
                    .label('new password'),
                password: Yup.string().required(),
            })}
            onSubmit={async (data, { setSubmitting, setErrors }) => {
                const { errors } = await getFormStatusAndErrors(UsersApi.updateMyPassword(data));

                setSubmitting(false);

                errors && setErrors(errors);
            }}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form} noValidate>
                    <Input type="password" name="password" label="Current Password" />
                    <Input type="password" name="newPassword" label="New Password" />
                    <Button type="submit" modifier={ButtonModifier.primary} disabled={isSubmitting}>
                        Change Password
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
