import { Canister, CanisterResult, ic, nat, nat64, Principal } from 'azle';

export type CyclesOld = Canister<{
    receive_cycles(): CanisterResult<nat64>;
    receive_cycles128(): CanisterResult<nat>;
}>;

export const cycles_old_canister: CyclesOld = ic.canisters.CyclesOld(
    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
);

// class API

import { ExternalCanister, method } from 'azle';

export class Cycles extends ExternalCanister {
    @method
    receive_cycles: () => CanisterResult<nat64>;

    @method
    receive_cycles128: () => CanisterResult<nat>;
}

export const cycles_canister = new Cycles(
    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
);
