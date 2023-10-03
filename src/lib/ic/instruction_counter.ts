import { IDL } from '@dfinity/candid';

export function instructionCounter() {
    const instructionCounterCandidBytes =
        globalThis._azleIc.instructionCounter();
    return IDL.decode([IDL.Nat64], instructionCounterCandidBytes)[0];
}
