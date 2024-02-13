import fc from 'fast-check';
import { HttpHeadersArb } from './headers_arb';
import { BodyArb } from './body_arb';
import { HttpRequest, None, Some } from '../../../src/lib';
import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { blobToSrcLiteral } from '../candid/to_src_literal/blob';
import { stringToSrcLiteral } from '../candid/to_src_literal/string';

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
    'DELETE',
    'OPTIONS',
    'TRACE',
    'PATCH'
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

function HttpRequestValueArb() {
    return fc
        .tuple(
            RequestMethodArb,
            UrlPathArb,
            HttpHeadersArb(),
            BodyArb(),
            fc
                .option(fc.integer({ min: 0, max: 2 ** 16 - 1 }))
                .map((optCertVer) => {
                    return optCertVer === null ? None : Some(optCertVer);
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

        const bodySrc = blobToSrcLiteral(httpRequest.body);

        const certificateVersion =
            'Some' in httpRequest.certificate_version
                ? `Some(${httpRequest.certificate_version.Some})`
                : `None`;

        const optImport =
            'Some' in httpRequest.certificate_version ? 'Some' : 'None';

        return {
            value: {
                agentArgumentValue: httpRequest,
                agentResponseValue: httpRequest,
                runtimeCandidTypeObject: HttpRequest
            },
            src: {
                candidTypeAnnotation: 'HttpRequest',
                candidTypeObject: 'HttpRequest',
                variableAliasDeclarations: [],
                imports: new Set(['HttpRequest', optImport]),
                valueLiteral: `{
                    method: '${httpRequest.method}',
                    url: '${httpRequest.url}',
                    headers: [${headerStrings}],
                    body: ${bodySrc},
                    certificate_version: ${certificateVersion}
                }`
            }
        };
    });
}
