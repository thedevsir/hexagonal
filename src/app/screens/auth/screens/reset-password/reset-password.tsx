import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { getFormStatusAndErrors } from 'utils';
import { AuthApi, Input, Button, ButtonModifier } from 'app/shared';
import { Modal, Status, StatusModifier } from 'app/screens/auth/shared';

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

                if (status && status.modifier === StatusModifier.Success && !errors) {
                    setTimeout(() => history.replace('/login'), 1000);
                }
            }}
        >
            {({ status, isSubmitting }) => (
                <Form noValidate>
                    {status && <Status {...status} />}
                    <Input large name="password" type="password" placeholder="Password" />
                    <Input large name="confirmPassword" type="password" placeholder="Confirm Password" />
                    <Button block large type="submit" modifier={ButtonModifier.Primary} disabled={isSubmitting}>
                        LET'S GO
                    </Button>
                </Form>
            )}
        </Formik>
    </Modal>
);
