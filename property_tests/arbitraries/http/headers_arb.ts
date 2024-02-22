// See https://developers.cloudflare.com/rules/transform/request-header-modification/reference/header-format/

import fc from 'fast-check';

const RESERVED_HEADERS = ['__proto__'];

export function HttpHeadersArb() {
    const HeaderNameArb = fc
        .stringMatching(/^[a-zA-Z0-9_-]+$/)
        .filter((name) => !RESERVED_HEADERS.includes(name));

    const HeaderValueArb = fc
        .stringMatching(/^[a-zA-Z0-9_ .'!-+*#$&`|~^%]+$/)
        .map((value) => value.trim());

    const HeaderArb = fc.tuple(HeaderNameArb, HeaderValueArb);

    return fc.uniqueArray(HeaderArb, { selector: ([name, _]) => name });
}
