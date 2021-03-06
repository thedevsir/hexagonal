import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { getFormStatusAndErrors } from 'utils';
import { AuthApi, Input, Button, ButtonModifier } from 'app/shared';
import { Modal, Status } from 'app/screens/auth/shared';

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
            onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
                const { status, errors } = await getFormStatusAndErrors(AuthApi.resendEmail(values));

                setSubmitting(false);

                status && setStatus(status);
                errors && setErrors(errors);
            }}
        >
            {({ status, isSubmitting }) => (
                <Form noValidate>
                    {status && <Status {...status} />}
                    <Input large name="email" type="email" placeholder="E-mail" />
                    <Button block large type="submit" modifier={ButtonModifier.Primary} disabled={isSubmitting}>
                        SEND E-MAIL
                    </Button>
                </Form>
            )}
        </Formik>
    </Modal>
);

export const ResendEmail = ResendEmailModal;
