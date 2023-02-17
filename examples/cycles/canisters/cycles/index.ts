import {
    CanisterResult,
    ExternalCanister,
    nat,
    nat64,
    Principal,
    update
} from 'azle';

export class Cycles extends ExternalCanister {
    @update
    receive_cycles: () => CanisterResult<nat64>;

    @update
    receive_cycles128: () => CanisterResult<nat>;
}

export const cycles_canister = new Cycles(
    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
);
