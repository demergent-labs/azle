import { ic, nat, nat64, query, Service, update } from 'azle';

export default class extends Service {
    @update([], nat64)
    receiveCycles(): nat64 {
        return ic.msgCyclesAccept(ic.msgCyclesAvailable() / 2n);
    }

    // Moves all transferred cycles to the canister
    @update([], nat)
    receiveCycles128(): nat {
        return ic.msgCyclesAccept128(ic.msgCyclesAvailable128() / 2n);
    }

    @query([], nat64)
    getCanisterBalance(): nat64 {
        return ic.canisterBalance();
    }

    @query([], nat)
    getCanisterBalance128(): nat {
        return ic.canisterBalance128();
    }
}
