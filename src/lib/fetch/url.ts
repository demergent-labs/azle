import { URL } from 'url';

export function getUrl(input: RequestInfo | URL): URL {
    if (input instanceof URL) {
        return input;
    }

    if (typeof input === 'string') {
        return new URL(input);
    }

    throw new Error(`azleFetch: input must be of type URL or string`);
}
