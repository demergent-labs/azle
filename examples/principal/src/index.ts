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
export function principalReturnType(): Principal {
    return Principal.fromText('aaaaa-aa');
}

$query;
export function principalParam(principal: Principal): Principal {
    return principal;
}

$query;
export function principalInRecord(): User {
    return {
        id: Principal.fromText('aaaaa-aa'),
        username: 'lastmjs'
    };
}

$query;
export function principalInVariant(): Status {
    return {
        WaitingOn: Principal.fromText('aaaaa-aa')
    };
}

$query;
export function principalFromHex(principalHex: string): Principal {
    return Principal.fromHex(principalHex);
}

$query;
export function principalFromText(principalText: string): Principal {
    return Principal.fromText(principalText);
}

$query;
export function principalFromBlob(principalBytes: blob): Principal {
    return Principal.fromUint8Array(Uint8Array.from(principalBytes));
}

$query;
export function principalToHex(principal: Principal): string {
    return principal.toHex();
}

$query;
export function principalToText(principal: Principal): string {
    return principal.toText();
}

$query;
export function principalToBlob(principal: Principal): blob {
    return principal.toUint8Array();
}

$query;
export function principalSelfAuthenticating(publicKey: blob): Principal {
    return Principal.selfAuthenticating(publicKey);
}
