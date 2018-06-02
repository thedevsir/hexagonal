import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { getFormStatusAndErrors } from 'utils';
import { AUTH, Auth, BackdropLink, Button } from 'app/shared';
import { Modal, Status, Input } from 'app/screens/auth/shared';

export type RegisterModalProps = {
    auth?: Auth;
    onRequestClose?: () => void;
} & RouteComponentProps<any>;

export const RegisterModal = inject(AUTH)(
    observer<SFC<RegisterModalProps>>(({ onRequestClose, history, location, auth }) => (
        <Modal
            title="REGISTER"
            footer={
                <>
                    <span>
                        Already have an account ? <BackdropLink to="/login">Login</BackdropLink>
                    </span>
                    <br />
                    <span>
                        Send another <BackdropLink to="/resend-email">activation mail</BackdropLink>
                    </span>
                </>
            }
            onRequestClose={onRequestClose}
            flat={history.action === 'POP' || !location.state || !location.state.backdrop}
        >
            <Formik
                initialValues={{
                    email: '',
                    name: '',
                    password: '',
                    username: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required()
                        .label('e-mail'),
                    name: Yup.string().required(),
                    password: Yup.string().required(),
                    username: Yup.string().required(),
                })}
                onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
                    const { status, errors } = await getFormStatusAndErrors(auth!.register(values));

                    setSubmitting(false);

                    status && setStatus(status);
                    errors && setErrors(errors);
                }}
            >
                {({ status, isSubmitting }) => (
                    <Form noValidate>
                        {status && <Status {...status} />}
                        <Input name="name" placeholder="Name" />
                        <Input name="username" placeholder="Username" />
                        <Input type="email" name="email" placeholder="E-mail" />
                        <Input type="password" name="password" placeholder="Password" />
                        <Button block large type="submit" disabled={isSubmitting}>
                            REGISTER
                        </Button>
                    </Form>
                )}
            </Formik>
        </Modal>
    ))
);

export const Register = RegisterModal;
