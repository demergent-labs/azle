import { IDL, instructionCounter, query, update } from 'azle';

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
}

function sum(loops: number): void {
    let _sum = 0;

    for (let i = 0; i < loops; i++) {
        _sum += (i % 100) * (i % 100);
    }
}
