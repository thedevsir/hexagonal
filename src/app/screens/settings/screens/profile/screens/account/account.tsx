import React, { SFC } from 'react';
import { Formik, Form } from 'formik';
import { inject, observer } from 'mobx-react';
import * as Yup from 'yup';

import { getFormStatusAndErrors } from 'utils';
import { Input, Button, ButtonModifier, AUTH, Auth } from 'app/shared';
import { UsersApi } from 'app/screens/settings/screens/profile/shared';

import { Avatar } from './components';

import styles from './account.module.scss';

export type AccountInnerProps = { auth?: Auth };

export const AccountInner: SFC<AccountInnerProps> = ({ auth }) => (
    <Formik
        initialValues={{
            avatar: undefined,
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
        onSubmit={async (values, { setSubmitting, setErrors }) => {
            const { avatar, ...data } = values;

            // before user account updating waiting for avatar uploading
            // due to account updating invalidates the auth token.
            avatar && (await UsersApi.uploadAvatar(avatar));

            const { errors } = await getFormStatusAndErrors(UsersApi.updateMyAccount(data));

            setSubmitting(false);

            errors ? setErrors(errors) : auth!.logout();
        }}
    >
        {({ isSubmitting, setFieldValue }) => (
            <Form className={styles.form} noValidate>
                <Avatar
                    uploadable
                    size={64}
                    src="https://avatars0.githubusercontent.com/u/1410429?s=460&v=4"
                    onSelectAvatar={avatar => setFieldValue('avatar', avatar)}
                />
                <div className={styles.inputs}>
                    <Input name="username" label="Username" hint="Note that username is your ID in the Hexagonal" />
                    <Input
                        type="email"
                        name="email"
                        label="E-Mail"
                        hint="If you change your e-mail address then you should start verification process"
                    />
                    <Button type="submit" modifier={ButtonModifier.Primary} disabled={isSubmitting}>
                        Update
                    </Button>
                </div>
            </Form>
        )}
    </Formik>
);

export const Account = inject(AUTH)(observer(AccountInner));
