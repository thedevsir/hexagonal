import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { getFormStatusAndErrors } from 'utils';
import { Input, Button, ButtonModifier } from 'app/shared';
import { UsersApi } from 'app/screens/settings/screens/profile/shared';

import { Avatar } from './components';

import styles from './account.module.scss';

export const Account = () => (
    <div className={styles.container}>
        <Avatar size={64} src="https://avatars0.githubusercontent.com/u/1410429?s=460&v=4" />
        <Formik
            initialValues={{
                email: '',
                username: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required()
                    .label('e-mail'),
                username: Yup.string().required(),
            })}
            onSubmit={async (data, { setSubmitting, setErrors }) => {
                const { errors } = await getFormStatusAndErrors(UsersApi.updateMyAccount(data));

                setSubmitting(false);

                errors && setErrors(errors);
            }}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form} noValidate>
                    <Input name="username" label="Username" hint="Note that username is your ID in the Hexagonal" />
                    <Input
                        type="email"
                        name="email"
                        label="E-Mail"
                        hint="If you change your e-mail address then you should start verification process"
                    />
                    <Button type="submit" modifier={ButtonModifier.primary} disabled={isSubmitting}>
                        Update
                    </Button>
                </Form>
            )}
        </Formik>
    </div>
);
