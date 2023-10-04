import {
    blob,
    Canister,
    Null,
    Principal,
    query,
    Record,
    text,
    Variant
} from 'azle';

const User = Record({
    id: Principal,
    username: text
});

const Status = Variant({
    WaitingOn: Principal,
    Online: Null,
    Offline: Null
});

export default Canister({
    principalReturnType: query([], Principal, () => {
        return Principal.fromText('aaaaa-aa');
    }),
    principalParam: query([Principal], Principal, (principal) => {
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
    principalFromHex: query([text], Principal, (principalHex) => {
        return Principal.fromHex(principalHex);
    }),
    principalFromText: query([text], Principal, (principalText) => {
        return Principal.fromText(principalText);
    }),
    principalFromBlob: query([blob], Principal, (principalBytes) => {
        return Principal.fromUint8Array(Uint8Array.from(principalBytes));
    }),
    principalToHex: query([Principal], text, (principal) => {
        return principal.toHex();
    }),
    principalToText: query([Principal], text, (principal) => {
        return principal.toText();
    }),
    principalToBlob: query([Principal], blob, (principal) => {
        return principal.toUint8Array();
    }),
    principalSelfAuthenticating: query([blob], Principal, (publicKey) => {
        return Principal.selfAuthenticating(publicKey);
    })
});
