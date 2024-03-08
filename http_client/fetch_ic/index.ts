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

// TODO implement credentials
// TODO implement integrity
// TODO implement mode
// TODO implement redirect
// TODO implement referrer
// TODO implement referrerPolicy
// TODO implement signal
export async function fetchIc(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
): Promise<Response> {
    const identity = getIdentity(init?.headers);

    if (identity === undefined) {
        return await originalFetch(input, init);
    }

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
