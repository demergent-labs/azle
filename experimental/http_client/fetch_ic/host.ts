export function getHost(input: RequestInfo | URL): string {
    const hostString = getHostString(input);

    const runningLocally =
        hostString.includes(`localhost:`) || hostString.includes(`127.0.0.1:`);

    // icp-api.io is the API gateway hostname: https://internetcomputer.org/docs/current/references/http-gateway-protocol-spec#api-gateway-resolution
    // A production application may have a custom domain
    // thus it is safest to use icp-api.io instead of the hostString when on mainnet
    // I am also not sure if the hostString on mainnet e.g. https://canisterId.icp0.io can be used
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
