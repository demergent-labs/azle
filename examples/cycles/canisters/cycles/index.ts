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
    receiveCycles: () => CanisterResult<nat64>;

    @update
    receiveCycles128: () => CanisterResult<nat>;
}

export const cyclesCanister = new Cycles(
    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
);
