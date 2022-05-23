import {
    Query,
    Principal,
    nat8
} from 'azle';

// TODO test principals in records and variants as well

// TODO test sha224? js-sha256 is supposedly broken
// TODO go remove all of the custom code that we don't need anymore

export function principal_return_type(): Query<Principal> {
    return Principal.fromText('aaaaa-aa');
}

export function principal_param(principal: Principal): Query<Principal> {
    return principal;
}

export function principal_from_hex(principal_hex: string): Query<Principal> {
    return Principal.fromHex(principal_hex);
}

export function principal_from_text(principal_text: string): Query<Principal> {
    return Principal.fromText(principal_text);
}

export function principal_from_uint8array(principal_bytes: nat8[]): Query<Principal> {
    return Principal.fromUint8Array(Uint8Array.from(principal_bytes));
}

export function principal_to_uint8array(principal: Principal): Query<nat8[]> {
    return Array.from(principal.toUint8Array());
}

export function principal_to_hex(principal: Principal): Query<string> {
    return principal.toHex();
}

export function principal_to_text(principal: Principal): Query<string> {
    return principal.toText();
}