import {
    canisterCycleBalance,
    IDL,
    msgCyclesAccept,
    msgCyclesAvailable,
    query,
    update
} from 'azle';

export default class {
    @update([], IDL.Nat64)
    receiveCycles(): bigint {
        return msgCyclesAccept(msgCyclesAvailable() / 2n);
    }

    @query([], IDL.Nat64)
    getCanisterCycleBalance(): bigint {
        return canisterCycleBalance();
    }
}
