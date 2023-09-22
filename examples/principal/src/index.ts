import {
    blob,
    Null,
    Principal,
    principal,
    query,
    Record,
    Service,
    text,
    Variant
} from 'azle';

const User = Record({
    id: principal,
    username: text
});

const Status = Variant({
    WaitingOn: principal,
    Online: Null,
    Offline: Null
});

export default Service({
    principalReturnType: query([], principal, () => {
        return Principal.fromText('aaaaa-aa');
    }),
    principalParam: query([principal], principal, (principal) => {
        return principal;
    }),
    principalInRecord: query([], User, () => {
        return {
            id: Principal.fromText('aaaaa-aa'),
            username: 'lastmjs'
        };
    }),
    principalInVariant: query([], Status, () => {
        return {
            WaitingOn: Principal.fromText('aaaaa-aa')
        };
    }),
    principalFromHex: query([text], principal, (principalHex) => {
        return Principal.fromHex(principalHex);
    }),
    principalFromText: query([text], principal, (principalText) => {
        return Principal.fromText(principalText);
    }),
    principalFromBlob: query([blob], principal, (principalBytes) => {
        return Principal.fromUint8Array(Uint8Array.from(principalBytes));
    }),
    principalToHex: query([principal], text, (principal) => {
        return principal.toHex();
    }),
    principalToText: query([principal], text, (principal) => {
        return principal.toText();
    }),
    principalToBlob: query([principal], blob, (principal) => {
        return principal.toUint8Array();
    }),
    principalSelfAuthenticating: query([blob], principal, (publicKey) => {
        return Principal.selfAuthenticating(publicKey);
    })
});
