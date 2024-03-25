// TODO should we write tests for nodejs as well then?

import { createActor } from './actor';
import { call } from './call';
import { getCanisterId } from './get_canister_id';
import { getHost } from './host';
import { getIdentity } from './identity';
import { createResponse } from './response';

const originalFetch = globalThis.fetch;

// TODO it would be nice to get rid of the any cast
// TODO and to ensure that we really are using the correct types for fetch
(globalThis as any).fetch = fetchIc;

// TODO input can be a request, which acts just like init...we have not accounted for that
// TODO it seems very uncommon to do that though, for now we won't implement it
export async function fetchIc(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
): Promise<Response> {
    const identity = getIdentity(init?.headers);

    if (identity === undefined) {
        return await originalFetch(input, init);
    }

    logWarnings(init);

    const canisterId = getCanisterId(input);
    const host = getHost(input);
    const actor = await createActor(identity, canisterId, host);

    const callResult = await call(input, init, actor);
    const response = createResponse(callResult);

    return response;
}

export { createActor } from './actor';
export { createAgent } from './agent';
export { getCanisterId };
export { getHost } from './host';

function logWarnings(init?: RequestInit | undefined) {
    if (init === undefined) {
        return;
    }

    if (init.cache !== undefined) {
        logWarning(`cache`);
    }

    if (init.credentials !== undefined) {
        logWarning(`credentials`);
    }

    if (init.integrity !== undefined) {
        logWarning(`integrity`);
    }

    if (init.keepalive !== undefined) {
        logWarning(`keepalive`);
    }

    if (init.mode !== undefined) {
        logWarning(`mode`);
    }

    if (init.redirect !== undefined) {
        logWarning(`redirect`);
    }

    if (init.referrer !== undefined) {
        logWarning(`referrer`);
    }

    if (init.referrerPolicy !== undefined) {
        logWarning(`referrerPolicy`);
    }

    if (init.signal !== undefined) {
        logWarning(`signal`);
    }

    if (init.window !== undefined) {
        logWarning(`window`);
    }
}

function logWarning(method: string) {
    console.warn(
        `fetchIc: init.${method} has no effect when using an identity as the Authorization header`
    );
}
