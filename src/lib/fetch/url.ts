// TODO we do not support Request yet, same as the frontend fetch
// TODO we probably could as wasmedge-quickjs has a Request class in http
export function getUrl(input: RequestInfo | URL): URL {
    if (input instanceof URL) {
        return input;
    }

    if (typeof input === 'string') {
        return new URL(input);
    }

    throw new Error(`azleFetch: input must be of type URL or string`);
}
