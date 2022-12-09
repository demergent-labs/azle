import { blob, Principal, Query, Variant } from 'azle';

type User = {
    id: Principal;
    username: string;
};

type Status = Variant<{
    WaitingOn: Principal;
    Online: null;
    Offline: null;
}>;

export function principal_return_type(): Query<Principal> {
    return Principal.fromText('aaaaa-aa');
}

export function principal_param(principal: Principal): Query<Principal> {
    return principal;
}

export function principal_in_record(): Query<User> {
    return {
        id: Principal.fromText('aaaaa-aa'),
        username: 'lastmjs'
    };
}

export function principal_in_variant(): Query<Status> {
    return {
        WaitingOn: Principal.fromText('aaaaa-aa')
    };
}

export function principal_from_hex(principal_hex: string): Query<Principal> {
    return Principal.fromHex(principal_hex);
}

export function principal_from_text(principal_text: string): Query<Principal> {
    return Principal.fromText(principal_text);
}

export function principal_from_blob(principal_bytes: blob): Query<Principal> {
    return Principal.fromUint8Array(Uint8Array.from(principal_bytes));
}

export function principal_to_hex(principal: Principal): Query<string> {
    return principal.toHex();
}

export function principal_to_text(principal: Principal): Query<string> {
    return principal.toText();
}

export function principal_to_blob(principal: Principal): Query<blob> {
    return principal.toUint8Array();
}

export function principal_self_authenticating(
    public_key: blob
): Query<Principal> {
    return Principal.selfAuthenticating(public_key);
}
