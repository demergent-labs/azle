import {
    canisterBalance,
    canisterBalance128,
    IDL,
    msgCyclesAccept,
    msgCyclesAccept128,
    msgCyclesAvailable,
    msgCyclesAvailable128,
    query,
    update
} from 'azle';

export default class {
    @update([], IDL.Nat64)
    receiveCycles(): bigint {
        return msgCyclesAccept(msgCyclesAvailable() / 2n);
    }

    // Moves all transferred cycles to the canister
    @update([], IDL.Nat)
    receiveCycles128(): bigint {
        return msgCyclesAccept128(msgCyclesAvailable128() / 2n);
    }

    @query([], IDL.Nat64)
    getCanisterBalance(): bigint {
        return canisterBalance();
    }

    @query([], IDL.Nat)
    getCanisterBalance128(): bigint {
        return canisterBalance128();
    }
}
