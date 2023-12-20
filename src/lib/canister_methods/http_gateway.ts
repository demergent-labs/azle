// See https://internetcomputer.org/docs/current/references/http-gateway-protocol-spec#canister-http-interface

import { blob } from '../candid/types/constructed/blob';
import { bool } from '../candid/types/primitive/bool';
import { Func } from '../candid/types/reference/func';
import { nat16 } from '../candid/types/primitive/nats/nat16';
import { Opt } from '../candid/types/constructed/opt';
import { Record } from '../candid/types/constructed/record';
import { text } from '../candid/types/primitive/text';
import { Tuple } from '../candid/types/constructed/tuple';
import {
    RequireExactlyOne,
    Variant
} from '../candid/types/constructed/variant';
import { Vec } from '../candid/types/constructed/vec';
import { CandidType } from '../candid';

export const HeaderField = Tuple(text, text);
export type HeaderField = typeof HeaderField.tsType;

export const HttpRequest = Record({
    /** The HTTP method in all upper case letters, e.g. "GET" */
    method: text,
    /**
     * The URL from the HTTP request line, i.e. without protocol or hostname,
     * and includes query parameters
     */
    url: text,
    /** The headers of the HTTP request */
    headers: Vec(HeaderField),
    /**
     * The body of the HTTP request (without any content encodings processed by
     * the HTTP Gateway)
     */
    body: blob,
    /**
     * Indicates the maximum supported version of [response verification](
     * https://internetcomputer.org/docs/current/references/http-gateway-protocol-spec#response-verification).
     * - A value of `2` will request the current standard of [response
     * verification](https://internetcomputer.org/docs/current/references/http-gateway-protocol-spec#response-verification),
     * while a missing version or a value of `1` will request the [legacy
     * standard](https://internetcomputer.org/docs/current/references/http-gateway-protocol-spec#legacy-response-verification).
     * - Current HTTP Gateway implementations will always request version `2`,
     * but older HTTP Gateways may still request version `1`.
     */
    certificate_version: Opt(nat16)
});
export type HttpRequest = typeof HttpRequest.tsType;

export const HttpUpdateRequest = Record({
    method: text,
    url: text,
    headers: Vec(HeaderField),
    body: blob
});
export type HttpUpdateRequest = typeof HttpUpdateRequest.tsType;

export function StreamingCallbackHttpResponse<Token extends CandidType>(
    token: Token
) {
    return Record({
        body: blob,
        token: Opt(token)
    });
}
type StreamingCallbackHttpResponse<Token> = {
    body: Uint8Array;
    token: Opt<Token>;
};

function Callback<Token extends CandidType>(token: Token) {
    return Func([token], Opt(StreamingCallbackHttpResponse(token)), 'query');
}
type Callback = Func;

function CallbackStrategy<Token extends CandidType>(token: Token) {
    return Record({
        callback: Callback(token),
        token
    });
}
export type CallbackStrategy<Token> = {
    callback: Callback;
    token: Token;
};

function StreamingStrategy<Token extends CandidType>(token: Token) {
    const thing = Variant({
        Callback: CallbackStrategy(token)
    });

    thing.tsType;

    return thing;
}
export type StreamingStrategy<Token> = Variant<{
    Callback: CallbackStrategy<Token>;
}>;

export function HttpResponse<Token extends CandidType>(token: Token) {
    return Record({
        status_code: nat16,
        headers: Vec(HeaderField),
        body: blob,
        upgrade: Opt(bool),
        streaming_strategy: Opt(StreamingStrategy(token))
    });
}
export type HttpResponse<Token> = {
    status_code: number;
    headers: HeaderField[];
    body: Uint8Array;
    upgrade: Opt<boolean>;
    streaming_strategy: Opt<StreamingStrategy<Token>>;
};
