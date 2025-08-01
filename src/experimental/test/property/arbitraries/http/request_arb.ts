import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { HttpRequest } from '#lib/canisters/http_gateway/idl/index';

import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { blobToSrcLiteral } from '../candid/to_src_literal/blob';
import { stringToSrcLiteral } from '../candid/to_src_literal/string';
import { BodyArb } from './body_arb';
import { HttpHeadersArb } from './headers_arb';

type RequestMethod =
    // | 'CONNECT' // Results in WARN hyper::proto::h1::role: unexpected content-length found, canceling
    | 'DELETE'
    | 'GET'
    // | 'HEAD' // Results in the body getting dropped
    | 'OPTIONS'
    | 'PATCH'
    | 'POST'
    | 'PUT'
    | 'TRACE';

const RequestMethodArb = fc.constantFrom<RequestMethod>(
    'GET',
    'POST',
    'PUT',
    'DELETE'
    // TODO add back in when resolved https://github.com/demergent-labs/azle/issues/2404
    // 'OPTIONS',
    // 'TRACE',
    // 'PATCH'
);

const UrlPathArb = fc.webUrl({ withQueryParameters: true }).map((url) => {
    const parsedUrl = new URL(url);
    // fc.webUrl gives us a path that is already encoded, but only partly. I
    // have found it leaving $ and @ unencoded. So to be safe we have to decode
    // all of the values (to prevent % from being encoded) and then reencode the
    // values to encode symbols such as $ and @
    const pathname = parsedUrl.pathname
        .split('/')
        .map((value) => encodeString(value))
        .join('/');
    const search = encodeString(parsedUrl.search, '?');
    const hash = encodeString(parsedUrl.hash, '#');
    return `${pathname}${search}${hash}`;
});

function encodeString(text: string, prefix: string = ''): string {
    if (text.length === 0) {
        return text;
    }

    return `${prefix}${encodeURIComponent(
        decodeURIComponent(text.slice(prefix.length))
    )}`;
}

// TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function HttpRequestValueArb() {
    return fc
        .tuple(
            RequestMethodArb,
            UrlPathArb,
            HttpHeadersArb(),
            BodyArb(),
            fc
                .option(fc.integer({ min: 0, max: 2 ** 16 - 1 }))
                .map((optCertVer): [number] | [] => {
                    return optCertVer === null ? [] : [optCertVer];
                })
        )
        .map(
            ([
                method,
                url,
                headers,
                body,
                certificate_version
            ]): HttpRequest => {
                return {
                    method,
                    url,
                    headers,
                    body,
                    certificate_version
                };
            }
        );
}

export function HttpRequestArb(): fc.Arbitrary<
    CandidValueAndMeta<HttpRequest>
> {
    return HttpRequestValueArb().map((httpRequest) => {
        const headerStrings = httpRequest.headers
            .map(
                ([name, value]) =>
                    `[${stringToSrcLiteral(name)},${stringToSrcLiteral(value)}]`
            )
            .join(',');

        const bodySrc = blobToSrcLiteral(new Uint8Array(httpRequest.body));

        const certificateVersion =
            'Some' in httpRequest.certificate_version
                ? `[${httpRequest.certificate_version.Some}]`
                : [];

        return {
            value: {
                agentArgumentValue: httpRequest,
                agentResponseValue: httpRequest,
                runtimeTypeObject: HttpRequest
            },
            src: {
                typeAnnotation: 'HttpRequest',
                typeObject: 'HttpRequest',
                variableAliasDeclarations: [
                    generateVariableAliasDeclarations()
                ],
                imports: new Set(['IDL']),
                valueLiteral: `{
                    method: '${httpRequest.method}',
                    url: '${httpRequest.url}',
                    headers: [${headerStrings}],
                    body: ${bodySrc},
                    certificate_version: ${certificateVersion}
                }`,
                idl: 'HttpRequest'
            }
        };
    });
}

function generateVariableAliasDeclarations(): string {
    return /*TS*/ `
        export const RequestHeaderField = IDL.Tuple(IDL.Text, IDL.Text);
        export type RequestHeaderField = [string, string];

        export const HttpRequest = IDL.Record({
            method: IDL.Text,
            url: IDL.Text,
            headers: IDL.Vec(RequestHeaderField),
            body: IDL.Vec(IDL.Nat8),
            certificate_version: IDL.Opt(IDL.Nat16)
        });
        export type HttpRequest = {
            method: string;
            url: string;
            headers: RequestHeaderField[];
            body: Uint8Array;
            certificate_version: [number] | [];
        };
    `;
}
