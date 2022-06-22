import { ic, nat, nat64, Update } from 'azle';

// Moves all transferred cycles to the canister
export function sendCycles(): Update<nat64> {
    return ic.msg_cycles_accept(ic.msg_cycles_available());
}

// Transfers the declared amount of cycles to the canister
export function msgCyclesAccept128(maxAmount: nat): Update<nat> {
    return ic.msg_cycles_accept128(maxAmount);
}
