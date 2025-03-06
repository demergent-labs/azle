import '#experimental/lib/assert_experimental';

import {
    blob,
    Func,
    nat,
    nat64,
    Null,
    Opt,
    Record,
    text,
    Variant,
    Vec
} from '#experimental/lib/index';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const HttpHeader = Record({
    name: text,
    value: text
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type HttpHeader = typeof HttpHeader.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const HttpMethod = Variant({
    get: Null,
    head: Null,
    post: Null
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type HttpMethod = typeof HttpMethod.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const HttpResponse = Record({
    /**
     * The response status (e.g., 200, 404)
     */
    status: nat,
    /**
     * List of HTTP response headers and their corresponding values. The number
     * of headers must not exceed 64. The total number of bytes representing the
     * header names and values must not exceed 48KiB. The total number of bytes
     * representing the header names and values must not exceed 48KiB.
     */
    headers: Vec(HttpHeader),
    /**
     * The response's body encoded as bytes
     */
    body: blob
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type HttpResponse = typeof HttpResponse.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const HttpTransformArgs = Record({
    response: HttpResponse,
    context: blob
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type HttpTransformArgs = typeof HttpTransformArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const HttpTransformFunc = Func(
    [HttpTransformArgs],
    HttpResponse,
    'query'
);
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type HttpTransformFunc = typeof HttpTransformFunc.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const HttpTransform = Record({
    /**
     * Transforms raw responses to sanitized responses. Must be an exported
     * canister method.
     */
    function: HttpTransformFunc,
    /**
     * A byte-encoded value that is provided to the function upon
     * invocation, along with the response to be sanitized.
     */
    context: blob
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type HttpTransform = typeof HttpTransform.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const HttpRequestArgs = Record({
    /**
     * The requested URL. The URL must be valid according to
     * https://www.ietf.org/rfc/rfc3986.txt[RFC-3986] and its length must not
     * exceed 8192. The URL may specify a custom port number.
     */
    url: text,
    /**
     * Specifies the maximal size of the response in bytes. If provided, the
     * value must not exceed 2MB (2,000,000B). The call will be charged based on
     * this parameter. If not provided, the maximum of 2MB will be used.
     */
    max_response_bytes: Opt(nat64),
    /**
     * Currently, only GET, HEAD, and POST are supported
     */
    method: HttpMethod,
    /**
     * List of HTTP request headers and their corresponding values. The number
     * of headers must not exceed 64. The total number of bytes representing the
     * header names and values must not exceed 48KiB. The total number of bytes
     * representing the header names and values must not exceed 48KiB.
     */
    headers: Vec(HttpHeader),
    /**
     * The content of the request's body
     */
    body: Opt(blob),
    /**
     * An optional function that transforms raw responses to sanitized responses,
     * and a byte-encoded context that is provided to the function upon
     * invocation, along with the response to be sanitized.
     * If provided, the calling canister itself must export this function.
     */
    transform: Opt(HttpTransform)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type HttpRequestArgs = typeof HttpRequestArgs.tsType;
