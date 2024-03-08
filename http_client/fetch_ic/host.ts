export function getHost(input: RequestInfo | URL): string {
    const hostString = getHostString(input);

    const runningLocally =
        hostString.includes(`localhost:`) || hostString.includes(`127.0.0.1:`);

    const host = runningLocally === true ? hostString : 'http://icp-api.io';

    return host;
}

function getHostString(input: RequestInfo | URL): string {
    if (typeof input === 'string') {
        return new URL(input).host;
    }

    if (input instanceof URL) {
        return input.host;
    }

    if (input instanceof Request) {
        return getHostString(input.url);
    }

    throw new Error(`fetchIc: input not supported`);
}
