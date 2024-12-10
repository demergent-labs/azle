import { canisterBalance, cyclesBurn, IDL, query, update } from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/type_tests/assert_type';

export default class {
    @query([], IDL.Nat)
    getCycleBalance(): bigint {
        return canisterBalance();
    }

    @update([IDL.Nat], IDL.Nat)
    updateCyclesBurn(amount: bigint): bigint {
        return cyclesBurn(amount);
    }

    @query([], IDL.Bool)
    assertCanisterBalanceTypes(): boolean {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof canisterBalance>, bigint>
        >;
        return typeof canisterBalance() === 'bigint';
    }

    @update([IDL.Nat], IDL.Bool)
    assertCyclesBurnTypes(amount: bigint): boolean {
        type _AssertParamType = AssertType<
            NotAnyAndExact<Parameters<typeof cyclesBurn>[0], bigint>
        >;
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof cyclesBurn>, bigint>
        >;
        return typeof cyclesBurn(amount) === 'bigint';
    }
}
