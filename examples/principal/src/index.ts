import {
    blob,
    candid,
    Null,
    Principal,
    query,
    Record,
    Variant,
    Service,
    principal,
    text
} from 'azle';

class User extends Record {
    @candid(principal)
    id: Principal;

    @candid(text)
    username: text;
}

class Status extends Variant {
    @candid(principal)
    WaitingOn?: Principal;

    @candid(Null)
    Online?: Null;

    @candid(Null)
    Offline?: Null;
}

export default class extends Service {
    @query([], principal)
    principalReturnType(): Principal {
        return Principal.fromText('aaaaa-aa');
    }

    @query([principal], principal)
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

    @query([text], principal)
    principalFromHex(principalHex: text): Principal {
        return Principal.fromHex(principalHex);
    }

    @query([text], principal)
    principalFromText(principalText: text): Principal {
        return Principal.fromText(principalText);
    }

    @query([blob], principal)
    principalFromBlob(principalBytes: blob): Principal {
        return Principal.fromUint8Array(Uint8Array.from(principalBytes));
    }

    @query([principal], text)
    principalToHex(principal: Principal): text {
        return principal.toHex();
    }

    @query([principal], text)
    principalToText(principal: Principal): text {
        return principal.toText();
    }

    @query([principal], blob)
    principalToBlob(principal: Principal): blob {
        return principal.toUint8Array();
    }

    @query([blob], principal)
    principalSelfAuthenticating(publicKey: blob): Principal {
        return Principal.selfAuthenticating(publicKey);
    }
}
