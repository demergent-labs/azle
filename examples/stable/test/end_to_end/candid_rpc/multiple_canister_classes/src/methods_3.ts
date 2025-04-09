import { IDL, Principal, query, update } from 'azle';

export class Methods3 {
    @update([], IDL.Text)
    methods3Text(): string {
        return 'methods3Text';
    }

    @update([], IDL.Nat)
    methods3Nat(): bigint {
        return 3n;
    }

    @query([], IDL.Principal)
    methods3Principal(): Principal {
        return Principal.fromUint8Array(Uint8Array.from([3]));
    }
}
