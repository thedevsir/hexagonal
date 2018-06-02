import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { getFormStatusAndErrors } from 'utils';
import { AuthApi, Button } from 'app/shared';
import { Modal, Status, Input } from 'app/screens/auth/shared';

export type ForgotPasswordModalProps = { onRequestClose?: () => void } & RouteComponentProps<any>;

export const ForgotPasswordModal: SFC<ForgotPasswordModalProps> = ({ onRequestClose, history, location }) => (
    <Modal
        title="FORGOT PASSWORD"
        onRequestClose={onRequestClose}
        flat={history.action === 'POP' || !location.state || !location.state.backdrop}
    >
        <Formik
            initialValues={{
                email: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required()
                    .label('e-mail'),
            })}
            onSubmit={async (values, { setStatus, setSubmitting, setErrors }) => {
                const { status, errors } = await getFormStatusAndErrors(AuthApi.forgotPassword(values));

                setSubmitting(false);

                status && setStatus(status);
                errors && setErrors(errors);
            }}
        >
            {({ status, isSubmitting }) => (
                <Form noValidate>
                    {status && <Status {...status} />}
                    <Input type="email" name="email" placeholder="E-mail" />
                    <Button type="submit" disabled={isSubmitting}>
                        RECOVER
                    </Button>
                </Form>
            )}
        </Formik>
    </Modal>
);

export const ForgotPassword = ForgotPasswordModal;
