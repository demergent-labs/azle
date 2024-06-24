import { IDL, query, update } from 'azle';

export default class {
    @update([], IDL.Nat64)
    receiveCycles() {
        return ic.msgCyclesAccept(ic.msgCyclesAvailable() / 2n);
    }
    // Moves all transferred cycles to the canister
    @update([], IDL.Nat)
    receiveCycles128() {
        return ic.msgCyclesAccept128(ic.msgCyclesAvailable128() / 2n);
    }
    @query([], IDL.Nat64)
    getCanisterBalance() {
        return ic.canisterBalance();
    }
    @query([], IDL.Nat)
    getCanisterBalance128() {
        return ic.canisterBalance128();
    }
}
