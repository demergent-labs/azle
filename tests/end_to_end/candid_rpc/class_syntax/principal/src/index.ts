import { blob, Null, Principal, query, Record, text, Variant } from 'azle';

const User = Record({
    id: Principal,
    username: text
});

const Status = Variant({
    WaitingOn: Principal,
    Online: Null,
    Offline: Null
});

export default class {
    @query([], Principal)
    principalReturnType() {
        return Principal.fromText('aaaaa-aa');
    }
    @query([Principal], Principal)
    principalParam(principal) {
        return principal;
    }
    @query([], User)
    principalInRecord() {
        return {
            id: Principal.fromText('aaaaa-aa'),
            username: 'lastmjs'
        };
    }
    @query([], Status)
    principalInVariant() {
        return {
            WaitingOn: Principal.fromText('aaaaa-aa')
        };
    }
    @query([text], Principal)
    principalFromHex(principalHex) {
        return Principal.fromHex(principalHex);
    }
    @query([text], Principal)
    principalFromText(principalText) {
        return Principal.fromText(principalText);
    }
    @query([IDL.Vec(IDL.Nat8)], Principal)
    principalFromBlob(principalBytes) {
        return Principal.fromUint8Array(Uint8Array.from(principalBytes));
    }
    @query([Principal], text)
    principalToHex(principal) {
        return principal.toHex();
    }
    @query([Principal], text)
    principalToText(principal) {
        return principal.toText();
    }
    @query([Principal], IDL.Vec(IDL.Nat8))
    principalToBlob(principal) {
        return principal.toUint8Array();
    }
    @query([IDL.Vec(IDL.Nat8)], Principal)
    principalSelfAuthenticating(publicKey) {
        return Principal.selfAuthenticating(publicKey);
    }
}
