import { ic, nat, nat64, Update } from 'azle';

// Transfers the declared amount of cycles to the canister
export function msgCyclesAccept(maxAmount: nat64): Update<nat64> {
    return ic.msg_cycles_accept(maxAmount);
}

// Transfers the declared amount of cycles to the canister
export function msgCyclesAccept128(maxAmount: nat): Update<nat> {
    return ic.msg_cycles_accept128(maxAmount);
}
