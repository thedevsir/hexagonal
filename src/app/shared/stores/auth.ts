import { observable, action, computed, reaction } from 'mobx';

import { Token } from 'utils';
import { LoginReqData, AuthApi, RegisterReqData } from 'app/shared';

export const AUTH = 'auth';

export type TokenPayload = {
    user: {
        username: string;
    };
};

const TOKEN_KEY = process.env.TOKEN_KEY!;

export class Auth {
    @observable private _token = Token.fromLocalStorage<TokenPayload>(TOKEN_KEY);

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

        this._setToken(token);
    }

    async register(data: RegisterReqData) {
        const { data: token } = await AuthApi.register(data);

        this._setToken(token);
    }

    @action
    logout() {
        AuthApi.logout();
        this._token = null;
    }

    @action
    private _setToken(token: string) {
        this._token = new Token(token);
    }
}
