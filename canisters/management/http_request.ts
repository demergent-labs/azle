import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

export const HttpHeader = IDL.Record({
    name: IDL.Text,
    value: IDL.Text
});
export type HttpHeader = {
    name: string;
    value: string;
};

export const HttpMethod = IDL.Variant({
    get: IDL.Null,
    head: IDL.Null,
    post: IDL.Null
});
export type HttpMethod =
    | {
          get: null;
      }
    | { head: null }
    | { post: null };

export const HttpResponse = IDL.Record({
    /**
     * The response status (e.g., 200, 404)
     */
    status: IDL.Nat,
    /**
     * List of HTTP response headers and their corresponding values. The number
     * of headers must not exceed 64. The total number of bytes representing the
     * header names and values must not exceed 48KiB. The total number of bytes
     * representing the header names and values must not exceed 48KiB.
     */
    headers: IDL.Vec(HttpHeader),
    /**
     * The response's body encoded as bytes
     */
    body: IDL.Vec(IDL.Nat8)
});
export type HttpResponse = {
    status: bigint;
    headers: HttpHeader[];
    body: Uint8Array;
};

export const HttpTransformArgs = IDL.Record({
    response: HttpResponse,
    context: IDL.Vec(IDL.Nat8)
});
export type HttpTransformArgs = {
    response: HttpResponse;
    context: Uint8Array;
};

export const HttpTransformFunc = IDL.Func(
    [HttpTransformArgs],
    [HttpResponse],
    ['query']
);
export type HttpTransformFunc = [Principal, string];

export const HttpTransform = IDL.Record({
    /**
     * Transforms raw responses to sanitized responses. Must be an exported
     * canister method.
     */
    function: HttpTransformFunc,
    /**
     * A byte-encoded value that is provided to the function upon
     * invocation, along with the response to be sanitized.
     */
    context: IDL.Vec(IDL.Nat8)
});
export type HttpTransform = {
    function: HttpTransformFunc;
    context: Uint8Array;
};

export const HttpRequestArgs = IDL.Record({
    /**
     * The requested URL. The URL must be valid according to
     * https://www.ietf.org/rfc/rfc3986.txt[RFC-3986] and its length must not
     * exceed 8192. The URL may specify a custom port number.
     */
    url: IDL.Text,
    /**
     * Specifies the maximal size of the response in bytes. If provided, the
     * value must not exceed 2MB (2,000,000B). The call will be charged based on
     * this parameter. If not provided, the maximum of 2MB will be used.
     */
    max_response_bytes: IDL.Opt(IDL.Nat64),
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
    headers: IDL.Vec(HttpHeader),
    /**
     * The content of the request's body
     */
    body: IDL.Opt(IDL.Vec(IDL.Nat8)),
    /**
     * An optional function that transforms raw responses to sanitized responses,
     * and a byte-encoded context that is provided to the function upon
     * invocation, along with the response to be sanitized.
     * If provided, the calling canister itself must export this function.
     */
    transform: IDL.Opt(HttpTransform)
});
export type HttpRequestArgs = {
    url: string;
    max_response_bytes: [bigint] | [];
    method: HttpMethod;
    headers: HttpHeader[];
    body: [Uint8Array] | [];
    transform: [HttpTransform] | [];
};
