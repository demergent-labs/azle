// TODO this is meant to be basic for now
export class AzleFetchHeaders {
    headers: {
        [key: string]: string;
    } = {};

    [Symbol.iterator]() {
        return this.entries();
    }

    constructor(headers?: HeadersInit) {
        if (Array.isArray(headers)) {
            this.headers = headers.reduce((acc, [key, value]) => {
                return {
                    ...acc,
                    [key]: value
                };
            }, {});
        }

        if (headers instanceof AzleFetchHeaders) {
            this.headers = headers.headers;
        }

        if (typeof headers === 'object') {
            this.headers = headers as AzleFetchHeaders['headers']; // TODO it would be nice to get rid of this cast
        }
    }

    // TODO append seems a bit complicated to implement because we have to know which
    // TODO headers can accept multiple values
    append() {
        throw new Error(`AzleFetchHeaders: append is not yet implemented`);
    }

    // TODO we do not throw here like the documentation says we should
    delete(name: string) {
        delete this.headers[name];
    }

    entries() {
        return Object.entries(this.headers)[Symbol.iterator]();
    }

    forEach(
        callback: (
            value: string,
            key: string,
            headers: AzleFetchHeaders
        ) => any,
        thisArg: any = this // TODO is this the correct this?
    ) {
        Object.entries(this.headers).forEach(([key, value]) => {
            callback.bind(thisArg)(value, key, this);
        });
    }

    get(name: string) {
        return this.headers[name] ?? null;
    }

    getSetCookie(): string[] {
        throw new Error(
            `AzleFetchHeaders: getSetCookie is not yet implemented`
        );
    }

    has(name: string) {
        return this.headers[name] !== undefined;
    }

    keys() {
        return Object.keys(this.headers)[Symbol.iterator]();
    }

    set(name: string, value: string) {
        this.headers[name] = value;
    }

    values() {
        return Object.values(this.headers)[Symbol.iterator]();
    }
}
