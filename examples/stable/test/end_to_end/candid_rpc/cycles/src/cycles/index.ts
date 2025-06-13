import {
    canisterCycleBalance,
    IDL,
    msgCyclesAccept,
    msgCyclesAvailable,
    query,
    update
} from 'azle';

export default class {
    @update([], IDL.Nat)
    receiveCycles(): bigint {
        return msgCyclesAccept(msgCyclesAvailable() / 2n);
    }

    @query([], IDL.Nat)
    getCanisterCycleBalance(): bigint {
        return canisterCycleBalance();
    }
}
