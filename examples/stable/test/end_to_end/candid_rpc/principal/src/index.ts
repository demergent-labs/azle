import { IDL, Principal, query } from 'azle';

const User = IDL.Record({
    id: IDL.Principal,
    username: IDL.Text
});
type User = {
    id: Principal;
    username: string;
};

const Status = IDL.Variant({
    WaitingOn: IDL.Principal,
    Online: IDL.Null,
    Offline: IDL.Null
});
type Status =
    | {
          WaitingOn: Principal;
      }
    | { Online: null }
    | { Offline: null };

export default class {
    @query([], IDL.Principal)
    principalReturnType(): Principal {
        return Principal.fromText('aaaaa-aa');
    }

    @query([IDL.Principal], IDL.Principal)
    principalParam(principal: Principal): Principal {
        return principal;
    }

    @query([], User)
    principalInRecord(): User {
        return {
            id: Principal.fromText('aaaaa-aa'),
            username: 'lastmjs'
        };
    }

    @query([], Status)
    principalInVariant(): Status {
        return {
            WaitingOn: Principal.fromText('aaaaa-aa')
        };
    }

    @query([IDL.Text], IDL.Principal)
    principalFromHex(principalHex: string): Principal {
        return Principal.fromHex(principalHex);
    }

    @query([IDL.Text], IDL.Principal)
    principalFromText(principalText: string): Principal {
        return Principal.fromText(principalText);
    }

    @query([IDL.Vec(IDL.Nat8)], IDL.Principal)
    principalFromBlob(principalBytes: Uint8Array): Principal {
        return Principal.fromUint8Array(Uint8Array.from(principalBytes));
    }

    @query([IDL.Principal], IDL.Text)
    principalToHex(principal: Principal): string {
        return principal.toHex();
    }

    @query([IDL.Principal], IDL.Text)
    principalToText(principal: Principal): string {
        return principal.toText();
    }

    @query([IDL.Principal], IDL.Vec(IDL.Nat8))
    principalToBlob(principal: Principal): Uint8Array {
        return principal.toUint8Array();
    }

    @query([IDL.Vec(IDL.Nat8)], IDL.Principal)
    principalSelfAuthenticating(publicKey: Uint8Array): Principal {
        return Principal.selfAuthenticating(publicKey);
    }
}
