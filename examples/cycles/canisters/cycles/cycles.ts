import { ic, nat, nat64, Query, Update } from 'azle';

// Moves all transferred cycles to the canister
export function receiveCycles(): Update<nat64> {
    return ic.msg_cycles_accept(ic.msg_cycles_available() / 2n);
}

// Moves all transferred cycles to the canister
export function receiveCycles128(): Update<nat> {
    return ic.msg_cycles_accept128(ic.msg_cycles_available128() / 2n);
}

export function getCanisterBalance(): Query<nat64> {
    return ic.canister_balance();
}

export function getCanisterBalance128(): Query<nat> {
    return ic.canister_balance128();
}
