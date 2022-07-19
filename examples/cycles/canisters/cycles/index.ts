import { Canister, CanisterResult, ic, nat, nat64, Principal } from 'azle';

export type Cycles = Canister<{
    receiveCycles(): CanisterResult<nat64>;
    receiveCycles128(): CanisterResult<nat>;
}>;

export const cycles = ic.canisters.Cycles<Cycles>(
    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
);
