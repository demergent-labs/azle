import { Canister, CanisterResult, empty, ic, Principal } from 'azle';

export type SomeService = Canister<{
    reject(message: string): CanisterResult<empty>;
    accept(): CanisterResult<boolean>;
    error(): CanisterResult<empty>;
}>;

export const someService = ic.canisters.SomeService<SomeService>(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

// Used by `ic.result` example.

// export type Result = Variant<{
//     ok: boolean;
//     err: string;
// }>;
