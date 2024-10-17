import { call, IDL, msgCyclesRefunded, trap, update } from 'azle';

import { CyclesResult, CyclesResultIDL } from '../types';

export default class {
    @update([IDL.Nat64], CyclesResultIDL)
    async sendAllCycles(amount: bigint): Promise<CyclesResult> {
        const result = await call(getCyclesPrincipal(), 'receiveAllCycles', {
            returnIdlType: CyclesResultIDL,
            payment: amount
        });
        return { ...result, cyclesRefunded: msgCyclesRefunded() };
    }

    @update([IDL.Nat64], CyclesResultIDL)
    async sendHalfCycles(amount: bigint): Promise<CyclesResult> {
        const result = await call(getCyclesPrincipal(), 'receiveHalfCycles', {
            returnIdlType: CyclesResultIDL,
            payment: amount
        });
        return { ...result, cyclesRefunded: msgCyclesRefunded() };
    }

    @update([IDL.Nat64], CyclesResultIDL)
    async sendNoCycles(amount: bigint): Promise<CyclesResult> {
        const result = await call(getCyclesPrincipal(), 'receiveNoCycles', {
            returnIdlType: CyclesResultIDL,
            payment: amount
        });
        return { ...result, cyclesRefunded: msgCyclesRefunded() };
    }

    @update([IDL.Nat64], IDL.Nat64)
    async sendCyclesManual(amount: bigint): Promise<bigint> {
        console.log(
            'sendCyclesManual And its for sure this unquie one from 1:17',
            amount
        );
        const result = await call(getCyclesPrincipal(), 'receiveCyclesManual', {
            returnIdlType: IDL.Nat64,
            payment: amount
        });
        return result;
    }
}

function getCyclesPrincipal(): string {
    return (
        process.env.CYCLES_PRINCIPAL ??
        trap('process.env.CYCLES_PRINCIPAL is undefined')
    );
}
