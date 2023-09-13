import {
    blob,
    Record,
    Opt,
    Vec,
    Variant,
    candid,
    text,
    Null,
    nat64,
    nat,
    func
} from '../../src/lib_new';

export class HttpHeader extends Record {
    @candid(text)
    name: text;

    @candid(text)
    value: text;
}

export class HttpMethod extends Variant {
    @candid(Null)
    get?: Null;

    @candid(Null)
    head?: Null;

    @candid(Null)
    post?: Null;
}

export class HttpResponse extends Record {
    /**
     * The response status (e.g., 200, 404)
     */
    @candid(nat)
    status: nat;

    /**
     * List of HTTP response headers and their corresponding values. The number
     * of headers must not exceed 64. The total number of bytes representing the
     * header names and values must not exceed 48KiB. The total number of bytes
     * representing the header names and values must not exceed 48KiB.
     */
    @candid(Vec(HttpHeader))
    headers: Vec<HttpHeader>;

    /**
     * The response's body encoded as bytes
     */
    @candid(blob)
    body: blob;
}

export class HttpTransformArgs extends Record {
    @candid(HttpResponse)
    response: HttpResponse;

    @candid(blob)
    context: blob;
}

@func([HttpTransformArgs], HttpResponse, 'query')
export class HttpTransformFunc {}

export class HttpTransform extends Record {
    /**
     * Transforms raw responses to sanitized responses. Must be an exported
     * canister method.
     */
    @candid(HttpTransformFunc)
    function: HttpTransformFunc;
    /**
     * A byte-encoded value that is provided to the function upon
     * invocation, along with the response to be sanitized.
     */
    @candid(blob)
    context: blob;
}

export class HttpRequestArgs extends Record {
    /**
     * The requested URL. The URL must be valid according to
     * https://www.ietf.org/rfc/rfc3986.txt[RFC-3986] and its length must not
     * exceed 8192. The URL may specify a custom port number.
     */
    @candid(text)
    url: text;

    /**
     * Specifies the maximal size of the response in bytes. If provided, the
     * value must not exceed 2MB (2,000,000B). The call will be charged based on
     * this parameter. If not provided, the maximum of 2MB will be used.
     */
    @candid(Opt(nat64))
    max_response_bytes: Opt<nat64>;

    /**
     * Currently, only GET, HEAD, and POST are supported
     */
    @candid(HttpMethod)
    method: HttpMethod;

    /**
     * List of HTTP request headers and their corresponding values. The number
     * of headers must not exceed 64. The total number of bytes representing the
     * header names and values must not exceed 48KiB. The total number of bytes
     * representing the header names and values must not exceed 48KiB.
     */
    @candid(Vec(HttpHeader))
    headers: Vec<HttpHeader>;

    /**
     * The content of the request's body
     */
    @candid(Opt(blob))
    body: Opt<blob>;

    /**
     * An optional function that transforms raw responses to sanitized responses,
     * and a byte-encoded context that is provided to the function upon
     * invocation, along with the response to be sanitized.
     * If provided, the calling canister itself must export this function.
     */
    @candid(Opt(HttpTransform))
    transform: Opt<HttpTransform>;
}
