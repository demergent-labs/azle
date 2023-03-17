import { ic, nat, nat64, $query, $update } from 'azle';

// Moves all transferred cycles to the canister
$update;
export function receive_cycles(): nat64 {
    return ic.msgCyclesAccept(ic.msgCyclesAvailable() / 2n);
}

// Moves all transferred cycles to the canister
$update;
export function receive_cycles128(): nat {
    return ic.msgCyclesAccept128(ic.msgCyclesAvailable128() / 2n);
}

$query;
export function get_canister_balance(): nat64 {
    return ic.canisterBalance();
}

$query;
export function get_canister_balance128(): nat {
    return ic.canisterBalance128();
}
