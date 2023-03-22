import {
    CanisterResult,
    nat,
    nat64,
    Principal,
    Service,
    serviceUpdate
} from 'azle';

export class Cycles extends Service {
    @serviceUpdate
    receiveCycles: () => CanisterResult<nat64>;

    @serviceUpdate
    receiveCycles128: () => CanisterResult<nat>;
}

export const cyclesCanister = new Cycles(
    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
);
