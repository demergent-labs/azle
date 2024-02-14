// See https://developers.cloudflare.com/rules/transform/request-header-modification/reference/header-format/

import fc from 'fast-check';

export function HttpHeadersArb() {
    const HeaderNameArb = fc.stringMatching(/^[a-zA-Z0-9_-]+$/);

    const HeaderValueArb = fc
        .stringMatching(/^[a-zA-Z0-9_ .'!-+*#$&`|~^%]+$/)
        .map((value) => value.trim());

    const HeaderArb = fc.tuple(HeaderNameArb, HeaderValueArb);

    return fc.uniqueArray(HeaderArb, { selector: ([name, _]) => name });
}
