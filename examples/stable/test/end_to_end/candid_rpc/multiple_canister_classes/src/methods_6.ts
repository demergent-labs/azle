import { IDL, Principal, query, update } from 'azle';

export class Methods6 {
    @update([], IDL.Text)
    methods6Text(): string {
        return 'methods6Text';
    }

    @update([], IDL.Nat)
    methods6Nat(): bigint {
        return 6n;
    }

    @query([], IDL.Principal)
    methods6Principal(): Principal {
        return Principal.fromUint8Array(Uint8Array.from([6]));
    }
}
