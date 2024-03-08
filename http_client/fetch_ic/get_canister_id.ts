// TODO it would be pretty cool to get the canister id from DNS records
// TODO seems we would have to call some service that can query DNS
export function getCanisterId(input: RequestInfo | URL): string {
    if (typeof import.meta.env.IC_ORIGIN_CANISTER_ID === 'string') {
        return import.meta.env.IC_ORIGIN_CANISTER_ID;
    }

    if (typeof input === 'string') {
        return new URL(input).hostname.split('.')[0];
    }

    if (input instanceof URL) {
        return input.hostname.split('.')[0];
    }

    if (input instanceof Request) {
        return getCanisterId(input.url);
    }

    throw new Error(
        `fetchIc: canister id could not be obtained from URL or IC_ORIGIN_CANISTER_ID environment variable`
    );
}
