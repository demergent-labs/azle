import '../experimental';

// TODO this is meant to be basic for now
export class AzleFetchHeaders {
    headers: {
        [key: string]: string;
    } = {};

    [Symbol.iterator](): IterableIterator<[string, string]> {
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
    append(): void {
        throw new Error(`AzleFetchHeaders: append is not yet implemented`);
    }

    // TODO we do not throw here like the documentation says we should
    delete(name: string): void {
        delete this.headers[name];
    }

    entries(): IterableIterator<[string, string]> {
        return Object.entries(this.headers)[Symbol.iterator]();
    }

    forEach(
        callback: (
            value: string,
            key: string,
            headers: AzleFetchHeaders
        ) => any,
        thisArg: any = this // TODO is this the correct this?
    ): void {
        Object.entries(this.headers).forEach(([key, value]) => {
            callback.bind(thisArg)(value, key, this);
        });
    }

    get(name: string): string {
        return this.headers[name] ?? null;
    }

    getSetCookie(): string[] {
        throw new Error(
            `AzleFetchHeaders: getSetCookie is not yet implemented`
        );
    }

    has(name: string): boolean {
        return this.headers[name] !== undefined;
    }

    keys(): IterableIterator<string> {
        return Object.keys(this.headers)[Symbol.iterator]();
    }

    set(name: string, value: string): void {
        this.headers[name] = value;
    }

    values(): IterableIterator<string> {
        return Object.values(this.headers)[Symbol.iterator]();
    }
}
