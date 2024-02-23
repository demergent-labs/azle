import { Actor, Agent, HttpAgent, Identity } from '@dfinity/agent';

const originalFetch = window.fetch;

(window as any).fetch = fetchIc;

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
                certificate_version: IDL.Opt(IDL.Nat16)
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
    const url = new URL(urlString).pathname;
    console.log('url', url);
    const headers = prepareRequestHeaders(init).filter(
        ([key]) => key !== 'Authorization'
    );
    const body = await prepareRequestBody(init);

    if (init === undefined || init.method === 'GET') {
        return await actor.http_request({
            method: 'GET',
            url,
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
            method: 'GET',
            url,
            headers,
            body
        });
    }
}

function prepareRequestHeaders(
    init: RequestInit | undefined
): [string, string][] {
    if (init === undefined) {
        return [];
    }

    if (Array.isArray(init.headers)) {
        return init.headers;
    }

    if (init.headers instanceof Headers) {
        let headers = [];

        for (const header of init.headers.entries()) {
            headers.push(header);
        }

        return headers;
    }

    return [];
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

    // TODO handle ReadableStream

    // TODO handle buffersource

    // TODO handle formdata

    // TODO handle URLSearchParams

    if (typeof init.body === 'string') {
        const textEncoder = new TextEncoder();
        return textEncoder.encode(init.body);
    }

    if (init.body instanceof Blob) {
        return new Uint8Array(await init.body.arrayBuffer());
    }

    if (init.body instanceof ArrayBuffer) {
        return new Uint8Array(init.body);
    }

    return Uint8Array.from([]);
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
    const agent = new HttpAgent({
        host: import.meta.env.VITE_CANISTER_ORIGIN,
        identity
    });

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
