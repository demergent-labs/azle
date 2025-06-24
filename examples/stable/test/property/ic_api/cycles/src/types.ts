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
    initialAvailable: IDL.Nat,
    accepted: IDL.Nat,
    finalAvailable: IDL.Nat,
    startingCanisterCycleBalance: IDL.Nat,
    endingCanisterCycleBalance: IDL.Nat,
    cyclesRefunded: IDL.Nat
});
