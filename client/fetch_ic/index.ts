// TODO let's refactor this file now

// TODO add to the backend and frontend x-ic-force-query and x-ic-force-update
// TODO you might want to control queries or updates explicitly no matter the method
// TODO should we ensure that this works in Node.js as well? Or just focus on the browser?
// TODO add the user-agent header
// TODO add as many of the default chrome headers as possible
// TODO use AZLE_ for environment variables

import { Actor, Agent, HttpAgent, Identity } from '@dfinity/agent';

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
    const urlString = getUrlString(input);

    // TODO think of new names
    const callResult = await getCallResult(urlString, init, actor);
    const response = createResponse(callResult, urlString);

    return response;
}

async function createActor(identity: Identity, input: RequestInfo | URL) {
    const agent = await getAgent(identity);
    const canisterId = getCanisterId(input);

    if (canisterId === undefined) {
        throw new Error(
            `The canister id could not be determined from the fetch input argument`
        );
    }

    return Actor.createActor(
        ({ IDL }) => {
            const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);

            const HttpRequest = IDL.Record({
                method: IDL.Text,
                url: IDL.Text,
                headers: IDL.Vec(HeaderField),
                body: IDL.Vec(IDL.Nat8),
                certificate_version: IDL.Opt(IDL.Nat16) // TODO do we need to allow the user to set this
            });

            const HttpUpdateRequest = IDL.Record({
                method: IDL.Text,
                url: IDL.Text,
                headers: IDL.Vec(HeaderField),
                body: IDL.Vec(IDL.Nat8)
            });

            const StreamingToken = IDL.Record({});

            const StreamingCallbackHttpResponse = IDL.Record({
                body: IDL.Vec(IDL.Nat8),
                token: IDL.Opt(StreamingToken)
            });

            const StreamingStrategy = IDL.Variant({
                Callback: IDL.Record({
                    callback: IDL.Func(
                        [StreamingToken],
                        [StreamingCallbackHttpResponse],
                        ['query']
                    )
                })
            });

            const HttpResponse = IDL.Record({
                status_code: IDL.Nat16,
                headers: IDL.Vec(HeaderField),
                body: IDL.Vec(IDL.Nat8),
                upgrade: IDL.Opt(IDL.Bool),
                streaming_strategy: IDL.Opt(StreamingStrategy)
            });

            return IDL.Service({
                http_request: IDL.Func(
                    [HttpRequest],
                    [HttpResponse],
                    ['query']
                ),
                http_request_update: IDL.Func(
                    [HttpUpdateRequest],
                    [HttpResponse],
                    []
                )
            });
        },
        {
            agent,
            canisterId
        }
    );
}

function createResponse(callResult: any, url: string): Response {
    return new Response(callResult.body, {
        headers: new Headers(callResult.headers),
        status: callResult.status_code
    });
}

async function getCallResult(
    urlString: string,
    init: RequestInit | undefined,
    actor: any
) {
    const url = new URL(urlString);
    const urlAndQueryParams = `${url.pathname}${url.search}`;

    const body = await prepareRequestBody(init);
    const headers = prepareRequestHeaders(init).filter(
        ([key]) => key !== 'Authorization'
    );

    if (
        init === undefined ||
        init.method === undefined ||
        init.method === 'GET' ||
        init.method === 'HEAD' ||
        init.method === 'OPTIONS'
    ) {
        return await actor.http_request({
            method: init?.method ?? 'GET',
            url: urlAndQueryParams,
            headers,
            body,
            certificate_version: []
        });
    }

    if (
        init !== undefined &&
        (init.method === 'POST' ||
            init.method === 'PUT' ||
            init.method === 'PATCH' ||
            init.method === 'DELETE')
    ) {
        return await actor.http_request_update({
            method: init.method,
            url: urlAndQueryParams,
            headers: [
                ...headers,
                ...(body.length !== 0
                    ? [['Content-Length', body.length.toString()]]
                    : [])
            ],
            body
        });
    }

    throw new Error(`fetchIc: This request combination is not supported`);
}

function prepareRequestHeaders(
    init: RequestInit | undefined
): [string, string][] {
    if (init === undefined) {
        return [];
    }

    if (init.headers instanceof Headers) {
        throw new Error(`fetchIc: Headers is not a supported headers type`);
    }

    if (Array.isArray(init.headers)) {
        return init.headers;
    }

    if (typeof init.headers === 'object') {
        return Object.entries(init.headers);
    }

    throw new Error(`fetchIc: not a supported headers type`);
}

async function prepareRequestBody(
    init: RequestInit | undefined
): Promise<Uint8Array> {
    if (init === undefined) {
        return Uint8Array.from([]);
    }

    if (init.body === null) {
        return Uint8Array.from([]);
    }

    if (init.body === undefined) {
        return Uint8Array.from([]);
    }

    if (typeof init.body === 'string') {
        const textEncoder = new TextEncoder();
        return textEncoder.encode(init.body);
    }

    if (
        init.body instanceof ArrayBuffer ||
        init.body instanceof Uint8Array ||
        init.body instanceof Uint8ClampedArray ||
        init.body instanceof Uint16Array ||
        init.body instanceof Uint32Array ||
        init.body instanceof BigUint64Array ||
        init.body instanceof Int8Array ||
        init.body instanceof Int16Array ||
        init.body instanceof Int32Array ||
        init.body instanceof BigInt64Array ||
        init.body instanceof Float32Array ||
        init.body instanceof Float64Array
    ) {
        return new Uint8Array(init.body);
    }

    if (init.body instanceof DataView) {
        return new Uint8Array(init.body.buffer);
    }

    if (init.body instanceof Blob) {
        return new Uint8Array(await init.body.arrayBuffer());
    }

    if (init.body instanceof File) {
        const blob = new Blob([init.body], { type: init.body.type });
        const buffer = await blob.arrayBuffer();
        return new Uint8Array(buffer);
    }

    if (init.body instanceof URLSearchParams) {
        const encoder = new TextEncoder();
        return encoder.encode(init.body.toString());
    }

    if (init.body instanceof FormData) {
        throw new Error(`FormData is not a supported fetchIc body type`);
    }

    throw new Error(`Not a supported fetchIc body type`);
}

function getUrlString(input: RequestInfo | URL): string {
    if (typeof input === 'string') {
        return input;
    }

    if (input instanceof URL) {
        return input.toString();
    }

    if (input instanceof Request) {
        return input.url;
    }

    throw new Error(`input must be a string, URL, or Request`);
}

function getCanisterId(input: RequestInfo | URL): string | undefined {
    // TODO this should solve the case of using a custo domain scheme
    if (typeof import.meta.env.VITE_ORIGIN_CANISTER_ID === 'string') {
        return import.meta.env.VITE_ORIGIN_CANISTER_ID;
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

    return undefined;
}

// TODO actually I think we want to get the host from the URL maybe...
// TODO but what if they use a custom domain? Maybe they really need to set this...
// TODO this is a bit of a bummer though
// TODO maybe we can detect the canister id scheme and use that automatically
// TODO and then allow them to set an environment variable if they are using a custom domain
async function getAgent(identity: Identity): Promise<Agent> {
    // TODO we need to infer all of this first
    // TODO if VITE_CANISTER_ORIGIN exists then use that, otherwise we must get it from the URL
    const agent = new HttpAgent({
        host: import.meta.env.VITE_CANISTER_ORIGIN,
        identity
    });

    // TODO make this a little bit more robust, check for dots and ports maybe
    if (
        import.meta.env.VITE_CANISTER_ORIGIN?.includes(`localhost`) ||
        import.meta.env.VITE_CANISTER_ORIGIN?.includes(`127.0.0.1`)
    ) {
        await agent.fetchRootKey();
    }

    return agent;
}

function getIdentity(headers: RequestInit['headers']): Identity | undefined {
    const authorizationHeaderValue = getAuthorizationHeaderValue(headers);

    if (
        typeof authorizationHeaderValue === 'string' ||
        authorizationHeaderValue === undefined
    ) {
        return undefined;
    }

    // TODO let's do an explicit check to make sure we have an identity and not some other object

    return authorizationHeaderValue;
}

function getAuthorizationHeaderValue(
    headers: RequestInit['headers']
): string | undefined | Identity {
    if (Array.isArray(headers)) {
        return headers.reduce(
            (acc: string | undefined | Identity, [key, value]) => {
                if (key === 'Authorization') {
                    return value;
                }

                return acc;
            },
            undefined
        );
    }

    if (headers instanceof Headers) {
        return headers.get('Authorization') ?? undefined;
    }

    if (typeof headers === 'object') {
        return headers['Authorization'];
    }

    return undefined;
}
