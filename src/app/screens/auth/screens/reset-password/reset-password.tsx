import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { catchApiError } from 'utils';
import { AuthApi } from 'app/shared';
import { Modal, Status, Input, Button } from 'app/screens/auth/shared';

export type ResetPasswordProps = RouteComponentProps<{ key: string }>;

export const ResetPassword: SFC<ResetPasswordProps> = ({ history, match }) => (
    <Modal flat title="RESET PASSWORD">
        <Formik
            initialValues={{
                confirmPassword: '',
                password: '',
            }}
            validationSchema={Yup.object().shape({
                confirmPassword: Yup.string()
                    .required()
                    .oneOf([Yup.ref('password')], 'passwords does not match')
                    .label('confirm password'),
                password: Yup.string().required(),
            })}
            onSubmit={({ password }, actions) =>
                AuthApi.resetPassword({ key: match.params.key, password })
                    .then(() => setTimeout(() => history.replace('/login'), 1000))
                    .catch(catchApiError(actions))
            }
        >
            {({ status, isSubmitting }) => (
                <Form noValidate>
                    {status && <Status>{status}</Status>}
                    <Input type="password" name="password" placeholder="Password" />
                    <Input type="password" name="confirmPassword" placeholder="Confirm Password" />
                    <Button type="submit" disabled={isSubmitting}>
                        LET'S GO
                    </Button>
                </Form>
            )}
        </Formik>
    </Modal>
);
