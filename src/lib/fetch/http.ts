import { inflate } from 'pako';

import { azleFetch, serialize } from '.';
import { ic } from '../';
import { HttpTransform } from '../../../canisters/management';
import { AzleFetchResponse } from './response';
import { getUrl } from './url';

export type CandidHttpResponse = {
    status: bigint;
    headers: CandidHttpHeader[];
    body: Uint8Array;
};

export type CandidHttpHeader = {
    name: string;
    value: string;
};

export async function fetchHttp(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
): Promise<Response> {
    const urlObject = getUrl(input);
    const url = `${urlObject.origin}${urlObject.pathname}${urlObject.search}`; // For some sad reason toString() on our URL object from wasmedge-quickjs doesn't return the fully formatted URL as as tring, it returns [object Object]
    const maxResponseBytes = getHttpMaxResponseBytes();
    const method = getHttpMethod(init);
    const headers = getHeaders(init);
    const body = await prepareRequestBody(init);
    const transform = getHttpTransform();
    const cycles = getCycles(body[0], headers, maxResponseBytes[0]);

    const response = await azleFetch(`icp://aaaaa-aa/http_request`, {
        body: serialize({
            args: [
                {
                    url,
                    max_response_bytes: maxResponseBytes,
                    method,
                    headers,
                    body,
                    transform
                }
            ],
            cycles
        })
    });
    const responseJson: CandidHttpResponse = await response.json();

    const bodyIsGZipped =
        responseJson.headers.find(({ name, value }) => {
            return (
                name.toLowerCase() === 'content-encoding' &&
                value.toLowerCase() === 'gzip'
            );
        }) !== undefined;

    const unGZippedBody = bodyIsGZipped
        ? inflate(responseJson.body)
        : responseJson.body;

    // TODO do we need to handle chunked bodies at all?
    // TODO do we need to handle a chunked body on the frontend too?
    // TODO if so we can use the transfer-encoding chunked processing in server.ts
    // TODO seems the reason I did this was obviated after gzipping
    // TODO gzipping handled the chunked encoding and produced a full body
    // TODO but I assume it is possible for a chunked non-gzipped body to occur too
    // const bodyIsChunked =
    //     responseJson.headers.find(({ name, value }) => {
    //         return (
    //             name.toLowerCase() === 'transfer-encoding' &&
    //             value.toLowerCase() === 'chunked'
    //         );
    //     }) !== undefined;

    const finalBody = unGZippedBody;

    const responseHeaders = responseJson.headers.reduce(
        (acc, { name, value }) => {
            return {
                ...acc,
                [name]: value
            };
        },
        {}
    );

    // Using Response from wasmedge-quickjs doesn't seem ideal for the time being
    // It seems very tied to the low-level implementation at first glance
    // We will build up our own response for the time being
    return new AzleFetchResponse(finalBody, {
        status: Number(responseJson.status),
        headers: responseHeaders
    });
}

function getHttpMaxResponseBytes(): [] | [bigint] {
    return globalThis._azleOutgoingHttpOptionsMaxResponseBytes === undefined
        ? []
        : [globalThis._azleOutgoingHttpOptionsMaxResponseBytes];
}

function getHttpMethod(init?: RequestInit | undefined) {
    if (init === undefined) {
        return {
            get: null
        };
    }

    if (init.method === undefined) {
        return {
            get: null
        };
    }

    if (
        init.method.toLowerCase() !== 'get' &&
        init.method.toLowerCase() !== 'head' &&
        init.method.toLowerCase() !== 'post'
    ) {
        throw new Error(
            `azleFetch: ${init.method} is not a supported HTTP method`
        );
    }

    return {
        [init.method.toLowerCase()]: null
    };
}

function getHttpTransform(): [] | [HttpTransform] {
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

// Calculated according to: https://internetcomputer.org/docs/current/developer-docs/gas-cost#special-features
// and https://forum.dfinity.org/t/a-new-price-function-for-https-outcalls/20838
function getCycles(
    body: Uint8Array | undefined,
    headers: CandidHttpHeader[],
    maxResponseBytes: bigint | undefined
): bigint {
    const subnetSize = BigInt(
        globalThis._azleOutgoingHttpOptionsSubnetSize ?? 13
    );
    const baseFeeEstimate = (3_000_000n + 60_000n * subnetSize) * subnetSize;

    const concatenatedHeaders = headers.reduce(
        (acc, { name, value }) => `${acc}${name}${value}`,
        ''
    );
    const headersSize = BigInt(Buffer.byteLength(concatenatedHeaders, 'utf-8'));
    const bodySize = BigInt(body?.length ?? 0);
    const requestSize = headersSize + bodySize;
    const requestFeeEstimate = 400n * subnetSize * requestSize;

    const responseFeeEstimate =
        800n * subnetSize * (maxResponseBytes ?? 2_000_000n);

    const totalFeeEstimate =
        baseFeeEstimate + requestFeeEstimate + responseFeeEstimate;

    return globalThis._azleOutgoingHttpOptionsCycles ?? totalFeeEstimate;
}

// TODO I have decided to leave a lot of these objects even though they may not exist
// TODO we'll have to add these over time, the ones that make sense
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
        throw new Error(`azleFetch: FormData is not a supported body type`);
    }

    throw new Error(`azleFetch: Not a supported body type`);
}

function getHeaders(init: RequestInit | undefined): CandidHttpHeader[] {
    if (init === undefined) {
        return [];
    }

    if (init.headers === undefined) {
        return [];
    }

    if (Array.isArray(init.headers)) {
        return init.headers.map(([key, value]) => {
            return {
                name: key,
                value
            };
        });
    }

    if (typeof init.headers === 'object') {
        return Object.entries(init.headers).map(([key, value]) => {
            return {
                name: key,
                value
            };
        });
    }

    // TODO we do not currently have a Headers object
    // if (init.headers instanceof Headers) {
    //     throw new Error(`azleFetch: Headers is not a supported headers type`);
    // }

    throw new Error(`azleFetch: not a supported headers type`);
}
