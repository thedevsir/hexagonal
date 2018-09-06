import { observable, action, computed, reaction, runInAction } from 'mobx';

import { Token } from 'utils';
import { LoginReqData, AuthApi } from 'app/shared';

export const AUTH = 'auth';

export type TokenPayload = {
    user: {
        username: string;
    };
    session: {
        id: string;
    };
};

const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY!;

export class Auth {
    @observable
    private _token =
        process.env.NODE_ENV === 'development' && process.env.REACT_APP_TOKEN
            ? new Token<TokenPayload>(process.env.REACT_APP_TOKEN)
            : Token.fromLocalStorage<TokenPayload>(TOKEN_KEY);

    constructor() {
        reaction(() => this._token, token => (token ? localStorage.setItem(TOKEN_KEY, `${token}`) : localStorage.removeItem(TOKEN_KEY)));
    }

    get token() {
        return this._token;
    }

    @computed
    get isAuthenticated() {
        return this._token && this._token.isValid;
    }

    async login(data: LoginReqData) {
        const { data: token } = await AuthApi.login(data);

        runInAction(() => (this._token = new Token(token)));
    }

    @action
    logout() {
        AuthApi.logout();
        this._token = null;
    }
}
