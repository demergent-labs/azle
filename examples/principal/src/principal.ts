import { blob, Principal, $query, Record, Variant } from 'azle';

type User = Record<{
    id: Principal;
    username: string;
}>;

type Status = Variant<{
    WaitingOn: Principal;
    Online: null;
    Offline: null;
}>;

$query;
export function principal_return_type(): Principal {
    return Principal.fromText('aaaaa-aa');
}

$query;
export function principal_param(principal: Principal): Principal {
    return principal;
}

$query;
export function principal_in_record(): User {
    return {
        id: Principal.fromText('aaaaa-aa'),
        username: 'lastmjs'
    };
}

$query;
export function principal_in_variant(): Status {
    return {
        WaitingOn: Principal.fromText('aaaaa-aa')
    };
}

$query;
export function principal_from_hex(principal_hex: string): Principal {
    return Principal.fromHex(principal_hex);
}

$query;
export function principal_from_text(principal_text: string): Principal {
    return Principal.fromText(principal_text);
}

$query;
export function principal_from_blob(principal_bytes: blob): Principal {
    return Principal.fromUint8Array(Uint8Array.from(principal_bytes));
}

$query;
export function principal_to_hex(principal: Principal): string {
    return principal.toHex();
}

$query;
export function principal_to_text(principal: Principal): string {
    return principal.toText();
}

$query;
export function principal_to_blob(principal: Principal): blob {
    return principal.toUint8Array();
}

$query;
export function principal_self_authenticating(public_key: blob): Principal {
    return Principal.selfAuthenticating(public_key);
}
