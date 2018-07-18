import React, { SFC } from 'react';
import { withStateHandlers } from 'recompose';
import classNames from 'classnames';
import TiUpload from 'react-icons/lib/ti/upload';

import styles from './avatar.module.scss';

export type AvatarInnerProps = AvatarProps & AvatarUpdaters;

export const AvatarInner: SFC<AvatarInnerProps> = ({ size = 24, className, uploadable, setSrc, onSelectAvatar, ...rest }) => {
    let fileInput: HTMLInputElement | null;

    return (
        <div
            className={classNames(styles.avatar, uploadable && styles.uploadable, className)}
            style={{ width: size, height: size }}
            onClick={() => fileInput && fileInput.click()}
        >
            <img className={styles.image} {...rest} />
            {uploadable && (
                <>
                    <div className={styles.overlay}>
                        <TiUpload />
                    </div>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        className={styles.input}
                        onChange={({ target }) => {
                            const file = target.files![0];
                            setSrc(file && URL.createObjectURL(file));
                            onSelectAvatar && onSelectAvatar(file);
                        }}
                        ref={element => (fileInput = element!)}
                    />
                </>
            )}
        </div>
    );
};

export type AvatarProps = {
    size?: number;
    uploadable?: boolean;
    onSelectAvatar?: (avatar?: File) => void;
} & AvatarState &
    Omit<JSX.IntrinsicElements['img'], 'src'>;

export type AvatarState = {
    src: string;
};

export type AvatarUpdaters = {
    setSrc: (src?: string) => AvatarState;
};

export const Avatar = withStateHandlers<AvatarState, AvatarUpdaters, AvatarProps>(({ src }) => ({ src }), {
    setSrc: (_, { src }) => avatarSrc => ({
        src: avatarSrc || src,
    }),
})(AvatarInner);
