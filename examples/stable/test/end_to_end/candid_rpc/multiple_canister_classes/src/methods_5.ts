import { IDL, Principal, query, update } from 'azle';

export class Methods5 {
    @update([], IDL.Text)
    methods5Text(): string {
        return 'methods5Text';
    }

    @update([], IDL.Nat)
    methods5Nat(): bigint {
        return 5n;
    }

    @query([], IDL.Principal)
    methods5Principal(): Principal {
        return Principal.fromUint8Array(Uint8Array.from([5]));
    }
}
