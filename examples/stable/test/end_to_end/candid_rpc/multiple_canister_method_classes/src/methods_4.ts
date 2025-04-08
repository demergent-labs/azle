import { IDL, Principal, query, update } from 'azle';

export class Methods4 {
    @update([], IDL.Text)
    methods4Text(): string {
        return 'methods4Text';
    }

    @update([], IDL.Nat)
    methods4Nat(): bigint {
        return 4n;
    }

    @query([], IDL.Principal)
    methods4Principal(): Principal {
        return Principal.fromUint8Array(Uint8Array.from([4]));
    }
}
