import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { getFormStatusAndErrors } from 'utils';
import { AuthApi } from 'app/shared';
import { Modal, Status, StatusModifier, Input, Button } from 'app/screens/auth/shared';

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
            onSubmit={async ({ password }, { setSubmitting, setStatus, setErrors }) => {
                const { status, errors } = await getFormStatusAndErrors(AuthApi.resetPassword({ key: match.params.key, password }));

                setSubmitting(false);

                status && setStatus(status);
                errors && setErrors(errors);

                if (status && status.modifier === StatusModifier.success && !errors) {
                    setTimeout(() => history.replace('/login'), 1000);
                }
            }}
        >
            {({ status, isSubmitting }) => (
                <Form noValidate>
                    {status && <Status {...status} />}
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
