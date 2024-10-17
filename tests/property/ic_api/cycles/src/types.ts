import { IDL } from 'azle';

export type CyclesResult = {
    initialAvailable: bigint;
    accepted: bigint;
    finalAvailable: bigint;
    startingCanisterBalance: bigint;
    endingCanisterBalance: bigint;
    cyclesRefunded: bigint;
};

export const CyclesResultIDL = IDL.Record({
    initialAvailable: IDL.Nat64,
    accepted: IDL.Nat64,
    finalAvailable: IDL.Nat64,
    startingCanisterBalance: IDL.Nat64,
    endingCanisterBalance: IDL.Nat64,
    cyclesRefunded: IDL.Nat64
});
