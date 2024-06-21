import { IDL, Principal, query } from 'azle';

const User = IDL.Record({
    id: IDL.Principal,
    username: IDL.Text
});

const Status = IDL.Variant({
    WaitingOn: IDL.Principal,
    Online: IDL.Null,
    Offline: IDL.Null
});

export default class {
    @query([], IDL.Principal)
    principalReturnType() {
        return Principal.fromText('aaaaa-aa');
    }

    @query([IDL.Principal], IDL.Principal)
    principalParam(principal: Principal) {
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

    @query([IDL.Text], IDL.Principal)
    principalFromHex(principalHex: string) {
        return Principal.fromHex(principalHex);
    }

    @query([IDL.Text], IDL.Principal)
    principalFromText(principalText: string) {
        return Principal.fromText(principalText);
    }

    @query([IDL.Vec(IDL.Nat8)], IDL.Principal)
    principalFromBlob(principalBytes: Uint8Array) {
        return Principal.fromUint8Array(Uint8Array.from(principalBytes));
    }

    @query([IDL.Principal], IDL.Text)
    principalToHex(principal: Principal) {
        return principal.toHex();
    }

    @query([IDL.Principal], IDL.Text)
    principalToText(principal: Principal) {
        return principal.toText();
    }

    @query([IDL.Principal], IDL.Vec(IDL.Nat8))
    principalToBlob(principal: Principal) {
        return principal.toUint8Array();
    }

    @query([IDL.Vec(IDL.Nat8)], IDL.Principal)
    principalSelfAuthenticating(publicKey: Uint8Array) {
        return Principal.selfAuthenticating(publicKey);
    }
}
