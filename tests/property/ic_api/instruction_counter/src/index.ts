import { IDL, instructionCounter, query, update } from 'azle';
import { AssertType, NotAnyAndExact } from 'azle/type_tests/assert_type';

export default class {
    @query([IDL.Nat32], IDL.Nat64)
    queryInstructionCounter(loops: number): bigint {
        sum(loops);

        return instructionCounter();
    }

    @update([IDL.Nat32], IDL.Nat64)
    updateInstructionCounter(loops: number): bigint {
        sum(loops);

        return instructionCounter();
    }

    @query([], IDL.Bool)
    assertTypes(): boolean {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof instructionCounter>, bigint>
        >;
        return typeof instructionCounter() === 'bigint';
    }
}

function sum(loops: number): void {
    let _sum = 0;

    for (let i = 0; i < loops; i++) {
        _sum += (i % 100) * (i % 100);
    }
}
