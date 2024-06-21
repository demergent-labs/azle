import { IDL, query, update } from 'azle';

export default class {
    @update([], nat64)
    receiveCycles() {
        return ic.msgCyclesAccept(ic.msgCyclesAvailable() / 2n);
    }
    // Moves all transferred cycles to the canister
    @update([], nat)
    receiveCycles128() {
        return ic.msgCyclesAccept128(ic.msgCyclesAvailable128() / 2n);
    }
    @query([], nat64)
    getCanisterBalance() {
        return ic.canisterBalance();
    }
    @query([], nat)
    getCanisterBalance128() {
        return ic.canisterBalance128();
    }
}
