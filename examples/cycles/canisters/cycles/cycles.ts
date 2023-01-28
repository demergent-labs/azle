import { ic, nat, nat64, Query, Update } from 'azle';

// Moves all transferred cycles to the canister
export function receive_cycles(): Update<nat64> {
    return ic.msg_cycles_accept(ic.msg_cycles_available() / 2n);
}

// Moves all transferred cycles to the canister
export function receive_cycles128(): Update<nat> {
    return ic.msg_cycles_accept128(ic.msg_cycles_available128() / 2n);
}

export function get_canister_balance(): Query<nat64> {
    return ic.canister_balance();
}

export function get_canister_balance128(): Query<nat> {
    return ic.canister_balance128();
}

// class API

import { query, update } from 'azle';

export default class {
    // Moves all transferred cycles to the canister
    @update
    receive_cycles(): nat64 {
        return ic.msg_cycles_accept(ic.msg_cycles_available() / 2n);
    }

    // Moves all transferred cycles to the canister
    @update
    receive_cycles128(): nat {
        return ic.msg_cycles_accept128(ic.msg_cycles_available128() / 2n);
    }

    @query
    get_canister_balance(): nat64 {
        return ic.canister_balance();
    }

    @query
    get_canister_balance128(): nat {
        return ic.canister_balance128();
    }
}
