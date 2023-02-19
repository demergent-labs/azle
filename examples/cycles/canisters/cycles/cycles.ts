import { ic, nat, nat64, $query, $update } from 'azle';

// Moves all transferred cycles to the canister
$update;
export function receive_cycles(): nat64 {
    return ic.msg_cycles_accept(ic.msg_cycles_available() / 2n);
}

// Moves all transferred cycles to the canister
$update;
export function receive_cycles128(): nat {
    return ic.msg_cycles_accept128(ic.msg_cycles_available128() / 2n);
}

$query;
export function get_canister_balance(): nat64 {
    return ic.canister_balance();
}

$query;
export function get_canister_balance128(): nat {
    return ic.canister_balance128();
}
