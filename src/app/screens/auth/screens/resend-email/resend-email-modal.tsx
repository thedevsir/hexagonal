import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { catchApiError } from 'utils';
import { AuthApi } from 'app/shared';
import { Modal, Status, Input, Button } from 'app/screens/auth/shared';

export type ResendEmailModalProps = { onRequestClose?: () => void } & RouteComponentProps<any>;

export const ResendEmailModal: SFC<ResendEmailModalProps> = ({ onRequestClose, history, location }) => (
    <Modal
        title="ACCOUNT ACTIVATION"
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
            onSubmit={(values, actions) => AuthApi.resendEmail(values).catch(catchApiError(actions))}
        >
            {({ status, isSubmitting }) => (
                <Form noValidate>
                    {status && <Status>{status}</Status>}
                    <Input type="email" name="email" placeholder="E-mail" />
                    <Button type="submit" disabled={isSubmitting}>
                        SEND E-MAIL
                    </Button>
                </Form>
            )}
        </Formik>
    </Modal>
);

export const ResendEmail = ResendEmailModal;
