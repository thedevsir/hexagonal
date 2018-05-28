import jwtDecode from 'jwt-decode';

export class Token<P extends { [key: string]: any }> {
    payload?: P;

    static fromLocalStorage<P>(key: string) {
        const raw = localStorage.getItem(key);
        return raw ? new Token<P>(raw) : null;
    }

    constructor(public raw: string) {
        try {
            this.payload = jwtDecode(raw);
        } catch (error) {}
    }

    get isValid() {
        return this.payload && (this.payload.exp ? this.payload.exp > Date.now() : true);
    }

    toString() {
        return this.raw;
    }
}
