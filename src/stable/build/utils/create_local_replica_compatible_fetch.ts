export function createLocalReplicaCompatibleFetch(
    host: string
): typeof fetch | undefined {
    if (isLocalReplicaHost(host) === false) {
        return undefined;
    }

    return async (input, init) => {
        return fetch(getCompatibleLocalReplicaInput(input), init);
    };
}

function getCompatibleLocalReplicaInput(
    input: Parameters<typeof fetch>[0]
): Parameters<typeof fetch>[0] {
    const url = getUrl(input);

    if (
        url.pathname.startsWith('/api/v3/') === false &&
        url.pathname.startsWith('/api/v4/') === false
    ) {
        return input;
    }

    const compatibleUrl = new URL(url);
    compatibleUrl.pathname = compatibleUrl.pathname
        .replace('/api/v3/', '/api/v2/')
        .replace('/api/v4/', '/api/v2/');

    if (input instanceof Request) {
        return new Request(compatibleUrl, input);
    }

    if (typeof input === 'string') {
        return compatibleUrl.toString();
    }

    return compatibleUrl;
}

function getUrl(input: Parameters<typeof fetch>[0]): URL {
    if (input instanceof Request) {
        return new URL(input.url);
    }

    if (input instanceof URL) {
        return new URL(input);
    }

    return new URL(input);
}

function isLocalReplicaHost(host: string): boolean {
    return host.includes('localhost:') || host.includes('127.0.0.1:');
}
