// TODO CONNECT and TRACE are not currently supported as we believe ICP does not support them in any way

import { createActor } from './actor';

export type CallResult = CallHttpRequestResult | CallHttpRequestUpdateResult;

export type CallHttpRequestResult = Awaited<
    ReturnType<Awaited<ReturnType<typeof createActor>>['http_request']>
>;

export type CallHttpRequestUpdateResult = Awaited<
    ReturnType<Awaited<ReturnType<typeof createActor>>['http_request_update']>
>;

export async function call(
    input: RequestInfo | URL,
    init: RequestInit | undefined,
    actor: Awaited<ReturnType<typeof createActor>>
): Promise<CallResult> {
    const urlString = getUrlString(input);
    const url = new URL(urlString);
    const urlAndQueryParams = `${url.pathname}${url.search}`;

    const body = await prepareRequestBody(init);
    const headers = prepareRequestHeaders(init);

    if (shouldCallHttpRequest(init, headers)) {
        return await callHttpRequest(
            init,
            actor,
            urlAndQueryParams,
            headers,
            body
        );
    }

    if (shouldCallHttpRequestUpdate(init, headers)) {
        return await callHttpRequestUpdate(
            init,
            actor,
            urlAndQueryParams,
            headers,
            body
        );
    }

    throw new Error(`fetchIc: This request combination is not supported`);
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

    throw new Error(`fetchIc: input must be a string, URL, or Request`);
}

function prepareRequestHeaders(
    init: RequestInit | undefined
): [string, string][] {
    // TODO should we try to add in the default headers that browsers or Node.js would add?
    const headersTuples = getHeadersTuples(init);

    return headersTuples.filter(([key]) => key !== 'Authorization');
}

function getHeadersTuples(init: RequestInit | undefined): [string, string][] {
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
        throw new Error(`fetchIc: FormData is not a supported body type`);
    }

    throw new Error(`fetchIc: Not a supported body type`);
}

function shouldCallHttpRequest(
    init: RequestInit | undefined,
    headers: [string, string][]
): boolean {
    return (
        init === undefined ||
        init.method === undefined ||
        init.method === 'GET' ||
        init.method === 'HEAD' ||
        init.method === 'OPTIONS' ||
        headers.find(
            ([key, value]) =>
                key.toLowerCase() === 'x-ic-force-query' && value === 'true'
        ) !== undefined
    );
}

function shouldCallHttpRequestUpdate(
    init: RequestInit | undefined,
    headers: [string, string][]
): boolean {
    return (
        init !== undefined &&
        (init.method === 'POST' ||
            init.method === 'PUT' ||
            init.method === 'PATCH' ||
            init.method === 'DELETE' ||
            headers.find(
                ([key, value]) =>
                    key.toLowerCase() === 'x-ic-force-update' &&
                    value === 'true'
            ) !== undefined)
    );
}

async function callHttpRequest(
    init: RequestInit | undefined,
    actor: Awaited<ReturnType<typeof createActor>>,
    urlAndQueryParams: string,
    headers: [string, string][],
    body: Uint8Array
): Promise<CallHttpRequestResult> {
    const method = init?.method ?? 'GET';

    checkGetHeadBody(method, body);

    return await actor.http_request({
        method,
        url: urlAndQueryParams,
        headers,
        body,
        certificate_version: [2]
    });
}

async function callHttpRequestUpdate(
    init: RequestInit | undefined,
    actor: Awaited<ReturnType<typeof createActor>>,
    urlAndQueryParams: string,
    headers: [string, string][],
    body: Uint8Array
): Promise<CallHttpRequestUpdateResult> {
    const method = init?.method ?? 'GET';

    checkGetHeadBody(method, body);

    return await actor.http_request_update({
        method,
        url: urlAndQueryParams,
        headers: [
            ...headers,
            ...(body.length !== 0
                ? ([['Content-Length', body.length.toString()]] as [
                      string,
                      string
                  ][])
                : ([] as [string, string][]))
        ],
        body
    });
}

function checkGetHeadBody(method: string, body: Uint8Array) {
    if (
        (method.toLowerCase() === 'get' || method.toLowerCase() === 'head') &&
        body.length !== 0
    ) {
        throw new Error(
            `fetchIc: Request with GET/HEAD method cannot have body.`
        );
    }
}
