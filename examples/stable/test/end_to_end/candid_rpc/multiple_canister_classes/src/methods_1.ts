import { IDL, Principal, query, update } from 'azle';

export class Methods1 {
    @update([], IDL.Text)
    methods1Text(): string {
        return 'methods1Text';
    }

    @update([], IDL.Nat)
    methods1Nat(): bigint {
        return 1n;
    }

    @query([], IDL.Principal)
    methods1Principal(): Principal {
        return Principal.fromUint8Array(Uint8Array.from([1]));
    }
}
