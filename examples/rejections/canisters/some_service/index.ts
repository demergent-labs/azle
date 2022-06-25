import { Canister, CanisterResult, ic, Principal } from 'azle';

export type SomeService = Canister<{
    reject(message: string): CanisterResult<void>;
    accept(): CanisterResult<boolean>;
    error(): CanisterResult<void>;
}>;

export const someService = ic.canisters.SomeService<SomeService>(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);
