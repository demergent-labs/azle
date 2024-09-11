import { canisterBalance, cyclesBurn, IDL, query, update } from 'azle';

export default class {
    @query([], IDL.Nat)
    getCycleBalance(): bigint {
        return canisterBalance();
    }

    @update([IDL.Nat], IDL.Nat)
    updateCyclesBurn(amount: bigint): bigint {
        return cyclesBurn(amount);
    }
}
