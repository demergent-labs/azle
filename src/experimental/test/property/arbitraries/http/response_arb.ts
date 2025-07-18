import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { HttpResponse } from '#lib/canisters/http_gateway/idl/index';

import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from '../candid/corresponding_js_type';
import { blobToSrcLiteral } from '../candid/to_src_literal/blob';
import { stringToSrcLiteral } from '../candid/to_src_literal/string';
import { BodyArb } from './body_arb';
import { HttpHeadersArb } from './headers_arb';

export type HttpResponseAgentResponseValue = {
    status: number;
    headers: [string, string][];
    body: string;
};

// The following statuses are specified in the spec so we will favor these
// status in out tests
// https://www.rfc-editor.org/rfc/rfc9110.html
const SPEC_SPECIFIED_STATUS = [
    100, 101, 200, 201, 202, 203, 204, 205, 206, 300, 301, 302, 303, 304, 305,
    306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412,
    413, 414, 415, 416, 417, 418, 421, 422, 426, 500, 501, 502, 503, 504, 505
];

const StatusCodeArb = fc
    .oneof(
        {
            arbitrary: fc.constantFrom(
                ...SPEC_SPECIFIED_STATUS.filter((value) => value >= 200) // The ic replica doesn't support returning status codes in the 1xx range.
            ),
            weight: 2
        },
        { arbitrary: fc.integer({ min: 200, max: 599 }), weight: 1 } // The ic replica doesn't support returning status codes in the 1xx range.
    )
    .filter((status) => status !== 407 && status !== 421 && status !== 206);
// TODO Node's fetch doesn't handle 407 the same as other status, so we're filtering it out until we can figure out why
// TODO https://github.com/demergent-labs/azle/pull/1652
// TODO same applies to 421 status see https://github.com/demergent-labs/fourZeroSeven for more details
// TODO https://github.com/nodejs/help/issues/4345
// TODO Status 206 needs Content-Range header to work so we're filtering it out until we support that header in our arbitraries
// TODO https://github.com/demergent-labs/azle/issues/2768

export function HttpResponseValueArb(): fc.Arbitrary<HttpResponse> {
    return fc
        .tuple(StatusCodeArb, HttpHeadersArb())
        .chain(([statusCode, headers]) => {
            return fc.tuple(
                fc.constant(statusCode),
                fc.constant(headers),
                hasBody(statusCode) ? BodyArb() : fc.constant(new Uint8Array())
            );
        })
        .map(([status_code, headers, body]): HttpResponse => {
            return {
                status_code,
                headers,
                body,
                upgrade: [],
                streaming_strategy: []
            };
        });
}
export function HttpResponseArb(
    token: CandidValueAndMeta<CorrespondingJSType>
): fc.Arbitrary<
    CandidValueAndMeta<HttpResponse, HttpResponseAgentResponseValue>
> {
    return HttpResponseValueArb().map((response) => {
        const lowerCasedHeaders = response.headers.map<[string, string]>(
            ([name, value]) => [name.toLowerCase(), value]
        );

        const agentResponseValue = {
            status: response.status_code,
            headers: lowerCasedHeaders,
            body:
                response.status_code === 204 // No Content
                    ? ''
                    : new TextDecoder().decode(new Uint8Array(response.body))
        };

        const headerStrings = response.headers
            .map(
                ([name, value]) =>
                    `[${stringToSrcLiteral(name)},${stringToSrcLiteral(value)}]`
            )
            .join(',');

        const bodySrc = blobToSrcLiteral(new Uint8Array(response.body));

        const responseImports = ['IDL', 'Principal'];

        return {
            value: {
                agentArgumentValue: response,
                agentResponseValue: agentResponseValue,
                runtimeTypeObject: HttpResponse
            },
            src: {
                typeAnnotation: 'HttpResponse',
                typeObject: 'HttpResponse',
                variableAliasDeclarations: [
                    ...token.src.variableAliasDeclarations,
                    generateVariableAliasDeclarations(
                        token.src.typeObject,
                        token.src.typeAnnotation
                    )
                ],
                imports: new Set([...responseImports, ...token.src.imports]),
                valueLiteral: `{
                status_code: ${response.status_code},
                    headers: [${headerStrings}],
                    body: ${bodySrc},
                    upgrade: [],
                    streaming_strategy: []
                }`,
                idl: 'HttpResponse'
            }
        };
    });
}

function hasBody(statusCode: number): boolean {
    // The following code must not have content according to the http spec
    // https://www.rfc-editor.org/rfc/rfc9110.html
    if (
        statusCode < 200 ||
        statusCode === 204 ||
        statusCode === 205 ||
        statusCode === 304
    ) {
        return false;
    } else {
        return true;
    }
}

function generateVariableAliasDeclarations(
    TokenIdl: string,
    TokenType: string
): string {
    return /*TS*/ `
        const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
        type HeaderField = [string, string];
        const StreamingCallbackHttpResponse = IDL.Record({
            body: IDL.Vec(IDL.Nat8),
            token: IDL.Opt(${TokenIdl})
        });
        type StreamingCallbackHttpResponse = {
            body: Uint8Array;
            token: [${TokenType}] | [];
        };
        const Callback = IDL.Func(
            [${TokenIdl}],
            [IDL.Opt(StreamingCallbackHttpResponse)],
            ['query']
        );
        type Callback = [Principal, string];
        const CallbackStrategy = IDL.Record({
            callback: Callback,
            token: ${TokenIdl}
        });
        type CallbackStrategy = {
            callback: Callback;
            token: ${TokenType};
        };
        const StreamingStrategy = IDL.Variant({
            Callback: CallbackStrategy
        });
        type StreamingStrategy = {
            Callback: CallbackStrategy;
        };
        const HttpResponse = IDL.Record({
            status_code: IDL.Nat16,
            headers: IDL.Vec(HeaderField),
            body: IDL.Vec(IDL.Nat8),
            upgrade: IDL.Opt(IDL.Bool),
            streaming_strategy: IDL.Opt(StreamingStrategy)
        });
        type HttpResponse = {
            status_code: number;
            headers: HeaderField[];
            body: Uint8Array;
            upgrade: [boolean] | [];
            streaming_strategy: [StreamingStrategy] | [];
        };
    `;
}
