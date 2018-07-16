import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { getFormStatusAndErrors } from 'utils';
import { AuthApi, BackdropLink, Input, Button, ButtonModifier } from 'app/shared';
import { Modal, Status } from 'app/screens/auth/shared';

export type RegisterModalProps = { onRequestClose?: () => void } & RouteComponentProps<any>;

export const RegisterModal: SFC<RegisterModalProps> = ({ onRequestClose, history, location }) => (
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
                const { status, errors } = await getFormStatusAndErrors(AuthApi.register(values));

                setSubmitting(false);

                status && setStatus(status);
                errors && setErrors(errors);
            }}
        >
            {({ status, isSubmitting }) => (
                <Form noValidate>
                    {status && <Status {...status} />}
                    <Input large name="name" placeholder="Name" />
                    <Input large name="username" placeholder="Username" />
                    <Input large name="email" type="email" placeholder="E-mail" />
                    <Input large name="password" type="password" placeholder="Password" />
                    <Button block large type="submit" modifier={ButtonModifier.Primary} disabled={isSubmitting}>
                        REGISTER
                    </Button>
                </Form>
            )}
        </Formik>
    </Modal>
);

export const Register = RegisterModal;
