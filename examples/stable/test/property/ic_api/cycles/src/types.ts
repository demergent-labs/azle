import { IDL } from 'azle';

export type CyclesResult = {
    initialAvailable: bigint;
    accepted: bigint;
    finalAvailable: bigint;
    startingCanisterCycleBalance: bigint;
    endingCanisterCycleBalance: bigint;
    cyclesRefunded: bigint;
};

export const CyclesResult = IDL.Record({
    initialAvailable: IDL.Nat64,
    accepted: IDL.Nat64,
    finalAvailable: IDL.Nat64,
    startingCanisterCycleBalance: IDL.Nat64,
    endingCanisterCycleBalance: IDL.Nat64,
    cyclesRefunded: IDL.Nat64
});
