export async function call(
    input: RequestInfo | URL,
    init: RequestInit | undefined,
    actor: any
) {
    const urlString = getUrlString(input);
    const url = new URL(urlString);
    const urlAndQueryParams = `${url.pathname}${url.search}`;

    const body = await prepareRequestBody(init);
    const headers = prepareRequestHeaders(init);

    if (
        init === undefined ||
        init.method === undefined ||
        init.method === 'GET' ||
        init.method === 'HEAD' ||
        init.method === 'OPTIONS' ||
        headers.find(
            ([key, value]) => key === 'x-ic-force-query' && value === 'true'
        ) !== undefined
    ) {
        return await actor.http_request({
            method: init?.method ?? 'GET',
            url: urlAndQueryParams,
            headers,
            body,
            certificate_version: [2]
        });
    }

    if (
        init !== undefined &&
        (init.method === 'POST' ||
            init.method === 'PUT' ||
            init.method === 'PATCH' ||
            init.method === 'DELETE' ||
            headers.find(
                ([key, value]) =>
                    key === 'x-ic-force-update' && value === 'true'
            ) !== undefined)
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
    // TODO check all added headers for accuracy
    // TODO implement sec-fetch-site
    // TODO implement sec-fetch-dest
    // TODO implement sec-fetch-mode
    // TODO implement referer
    // TODO implement accept-encoding
    const headersTuples = [
        ...getHeadersTuples(init),
        ['user-agent', window.navigator.userAgent] as [string, string],
        ['cache-control', init?.cache ?? 'no-cache'] as [string, string],
        ['accept-language', window.navigator.languages.join(',')] as [
            string,
            string
        ],
        ['accept', '*/*'] as [string, string], // TODO when should we allow the dev to override these?
        ['host', window.location.host] as [string, string],
        ['connection', 'keep-alive'] as [string, string]
    ];

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
        throw new Error(
            `fetchIc: FormData is not a supported fetchIc body type`
        );
    }

    throw new Error(`fetchIc: Not a supported fetchIc body type`);
}
