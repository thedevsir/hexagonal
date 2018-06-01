import { observable, action, computed, when } from 'mobx';

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
        when(() => !this._token, () => localStorage.removeItem(TOKEN_KEY));
    }

    get token() {
        return this._token;
    }

    @computed
    get isAuthenticated() {
        return this._token && this._token.isValid;
    }

    async login({ remember = false, ...data }: LoginReqData & { remember?: boolean }) {
        const { data: token } = await AuthApi.login(data);

        this._setToken(token, remember);
    }

    async register({ remember = false, ...data }: RegisterReqData & { remember?: boolean }) {
        const { data: token } = await AuthApi.register(data);

        this._setToken(token, remember);
    }

    @action
    logout() {
        AuthApi.logout();
        this._token = null;
    }

    @action
    private _setToken(token: string, remember: boolean) {
        this._token = new Token(token);
        remember && localStorage.setItem(TOKEN_KEY, token);
    }
}
