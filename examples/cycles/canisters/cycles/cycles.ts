import { ic, nat, nat64, $query, $update } from 'azle';

// Moves all transferred cycles to the canister
$update;
export function receiveCycles(): nat64 {
    return ic.msgCyclesAccept(ic.msgCyclesAvailable() / 2n);
}

// Moves all transferred cycles to the canister
$update;
export function receiveCycles128(): nat {
    return ic.msgCyclesAccept128(ic.msgCyclesAvailable128() / 2n);
}

$query;
export function getCanisterBalance(): nat64 {
    return ic.canisterBalance();
}

$query;
export function getCanisterBalance128(): nat {
    return ic.canisterBalance128();
}
