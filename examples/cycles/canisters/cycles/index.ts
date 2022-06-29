import { Canister, CanisterResult, ic, nat, nat64, Principal } from 'azle';

export type Cycles = Canister<{
    sendCycles(cycles: nat64): CanisterResult<nat64>;
    sendCycles128(cycles: nat): CanisterResult<nat>;
}>;

export const cycles = ic.canisters.Cycles<Cycles>(
    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
);
