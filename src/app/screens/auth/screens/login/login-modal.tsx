import React, { SFC } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { getFormStatusAndErrors } from 'utils';
import { AUTH, Auth, BackdropLink, Input, Button, ButtonModifier } from 'app/shared';
import { Modal, Status } from 'app/screens/auth/shared';

export type LoginModalProps = {
    auth?: Auth;
    onRequestClose?: () => void;
} & RouteComponentProps<any>;

export const LoginModal: SFC<LoginModalProps> = inject(AUTH)(
    observer(({ onRequestClose, history, location, auth }) => (
        <Modal
            title="LOGIN"
            footer={
                <>
                    <BackdropLink to="/forgot-password">Forgot password ?</BackdropLink>
                    <br />
                    <span>
                        Don't have an account ? <BackdropLink to="/register">Register</BackdropLink>
                    </span>
                </>
            }
            onRequestClose={onRequestClose}
            flat={history.action === 'POP' || !(location.state && location.state.backdrop)}
        >
            <Formik
                initialValues={{
                    password: '',
                    usernameOrEmail: '',
                }}
                validationSchema={Yup.object().shape({
                    password: Yup.string().required(),
                    usernameOrEmail: Yup.string()
                        .required()
                        .label('username or e-mail'),
                })}
                onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
                    const { status, errors } = await getFormStatusAndErrors(auth!.login(values));

                    setSubmitting(false);

                    status && setStatus(status);
                    errors && setErrors(errors);
                }}
            >
                {({ status, isSubmitting }) => (
                    <Form>
                        {status && <Status {...status} />}
                        <Input large name="usernameOrEmail" placeholder="Username or E-mail" />
                        <Input large name="password" type="password" placeholder="Password" />
                        <Button block large type="submit" modifier={ButtonModifier.Primary} disabled={isSubmitting}>
                            LOGIN
                        </Button>
                    </Form>
                )}
            </Formik>
        </Modal>
    ))
);

export const Login = LoginModal;
