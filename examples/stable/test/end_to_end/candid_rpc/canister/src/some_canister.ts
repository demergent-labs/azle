import { IDL, Principal, query, update } from 'azle';

export default class {
    @query([], IDL.Bool)
    query1(): boolean {
        return true;
    }

    @update([], IDL.Text)
    update1(): string {
        return 'SomeCanister update1';
    }
}

export const Canister = IDL.Service({
    query1: IDL.Func([], [IDL.Bool], ['query']),
    update1: IDL.Func([], [IDL.Text])
});
export type Canister = Principal;
