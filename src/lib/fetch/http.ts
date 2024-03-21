import { ic } from '../';
import { azleFetch, serialize } from '.';

const pako = require('pako');

export async function fetchHttp(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
): Promise<Response> {
    console.log('azleFetch http 0');

    const body = await prepareRequestBody(init);
    // TODO also do headers and method and everything like on the client?

    console.log('azleFetch http 1');

    const response = await azleFetch(`icp://aaaaa-aa/http_request`, {
        body: serialize({
            args: [
                {
                    url: input,
                    max_response_bytes: getHttpMaxResponseBytes(),
                    method: getHttpMethod(init),
                    headers: init?.headers ?? [],
                    body,
                    transform: getHttpTransform()
                }
            ],
            cycles: globalThis._azleOutgoingHttpOptionsCycles ?? 3_000_000_000n // TODO this seems to be a conservative max size
        })
    });

    console.log('azleFetch http 2');

    const responseJson = await response.json();

    console.log('responseJson', responseJson);

    console.log('azleFetch http 3');

    console.log('responseJson.headers', responseJson.headers);
    console.log('responseJson.headers.length', responseJson.headers.length);
    console.log('responseJson.headers[0]', responseJson.headers[0]);
    console.log(Array.isArray(responseJson.headers));

    const bodyIsGZipped =
        responseJson.headers.find(({ name, value }) => {
            return (
                name.toLowerCase() === 'content-encoding' &&
                value.toLowerCase() === 'gzip'
            );
        }) !== undefined;

    console.log('bodyIsGZipped', bodyIsGZipped);

    console.log('responseJson.body.length', responseJson.body.length);

    const unGZippedBody = bodyIsGZipped
        ? pako.inflate(responseJson.body)
        : responseJson.body;

    console.log('unGZippedBody.length', unGZippedBody.length);

    // TODO do we need to handle a chunked body on the frontend too?
    const bodyIsChunked =
        responseJson.headers.find(({ name, value }) => {
            return (
                name.toLowerCase() === 'transfer-encoding' &&
                value.toLowerCase() === 'chunked'
            );
        }) !== undefined;

    console.log('bodyIsChunked', bodyIsChunked);

    // const bufferedBody = Buffer.from(responseJson.body);

    // const processedBody = chunkedBody
    //     ? processChunkedBody(bufferedBody)
    //     : bufferedBody;

    console.log(Buffer.from(unGZippedBody).toString());

    // const processedBody = bodyIsChunked
    //     ? processChunkedBody(Buffer.from(unGZippedBody))
    //     : unGZippedBody;

    const processedBody = Buffer.from(unGZippedBody);

    // TODO can we use the response object from wasmedge-quickjs?
    return {
        status: Number(responseJson.status),
        statusText: '', // TODO not done
        arrayBuffer: async () => {
            return processedBody.buffer;
        },
        json: async () => {
            return JSON.parse(Buffer.from(processedBody).toString());
        },
        text: async () => {
            return Buffer.from(processedBody).toString();
        }
    } as any;
}

function getHttpMaxResponseBytes() {
    return globalThis._azleOutgoingHttpOptionsMaxResponseBytes === undefined
        ? []
        : [globalThis._azleOutgoingHttpOptionsMaxResponseBytes];
}

// TODO throw errors on unsupported methods?
function getHttpMethod(init?: RequestInit | undefined) {
    if (init === undefined || init.method === undefined) {
        return {
            get: null
        };
    }

    return {
        [init.method?.toLowerCase()]: null
    };
}

function getHttpTransform() {
    if (globalThis._azleOutgoingHttpOptionsTransformMethodName === undefined) {
        return [];
    }

    return [
        {
            function: [
                ic.id(),
                globalThis._azleOutgoingHttpOptionsTransformMethodName
            ],
            context:
                globalThis._azleOutgoingHttpOptionsTransformContext ??
                Uint8Array.from([])
        }
    ];
}

// TODO some of these instanceof checks might break
// TODO some of those objects might not exist in QuickJS/wasmedge-quickjs
async function prepareRequestBody(
    init: RequestInit | undefined
): Promise<[Uint8Array] | []> {
    if (init === undefined) {
        return [];
    }

    if (init.body === null) {
        return [];
    }

    if (init.body === undefined) {
        return [];
    }

    if (typeof init.body === 'string') {
        const textEncoder = new TextEncoder();
        return [textEncoder.encode(init.body)];
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
        return [new Uint8Array(init.body)];
    }

    if (init.body instanceof DataView) {
        return [new Uint8Array(init.body.buffer)];
    }

    if (init.body instanceof Blob) {
        return [new Uint8Array(await init.body.arrayBuffer())];
    }

    if (init.body instanceof File) {
        const blob = new Blob([init.body], { type: init.body.type });
        const buffer = await blob.arrayBuffer();
        return [new Uint8Array(buffer)];
    }

    if (init.body instanceof URLSearchParams) {
        const encoder = new TextEncoder();
        return [encoder.encode(init.body.toString())];
    }

    if (init.body instanceof FormData) {
        throw new Error(
            `azleFetch: FormData is not a supported fetchIc body type`
        );
    }

    throw new Error(`azleFetch: Not a supported fetchIc body type`);
}
