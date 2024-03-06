// TODO let's refactor this file now

// TODO add to the backend and frontend x-ic-force-query and x-ic-force-update
// TODO you might want to control queries or updates explicitly no matter the method
// TODO should we ensure that this works in Node.js as well? Or just focus on the browser?
// TODO add the user-agent header
// TODO add as many of the default chrome headers as possible
// TODO use AZLE_ for environment variables

import { createActor } from './actor';
import { call } from './call';
import { getIdentity } from './identity';
import { createResponse } from './response';

const originalFetch = window.fetch;

// TODO it would be nice to get rid of the any cast
// TODO and to ensure that we really are using the correct types for fetch
(window as any).fetch = fetchIc;

// TODO RequestInit has many many things to implement
export async function fetchIc(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
): Promise<Response> {
    const identity = getIdentity(init?.headers);

    if (identity === undefined) {
        return await originalFetch(input, init);
    }

    const actor = await createActor(identity, input);

    const callResult = await call(input, init, actor);
    const response = createResponse(callResult);

    return response;
}
