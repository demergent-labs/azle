import { IDL, Principal, query, update } from 'azle';

export class Methods2 {
    @update([], IDL.Text)
    methods2Text(): string {
        return 'methods2Text';
    }

    @update([], IDL.Nat)
    methods2Nat(): bigint {
        return 2n;
    }

    @query([], IDL.Principal)
    methods2Principal(): Principal {
        return Principal.fromUint8Array(Uint8Array.from([2]));
    }
}
