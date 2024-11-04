import { call, IDL, msgCyclesRefunded, update } from 'azle';

import { CyclesResult, CyclesResultIDL } from '../types';

export default class {
    cyclesPrincipal = getCyclesPrincipal();

    @update([IDL.Nat64], CyclesResultIDL)
    async sendAllCycles(amount: bigint): Promise<CyclesResult> {
        const result = await call(this.cyclesPrincipal, 'receiveAllCycles', {
            returnIdlType: CyclesResultIDL,
            cycles: amount
        });
        return { ...result, cyclesRefunded: msgCyclesRefunded() };
    }

    @update([IDL.Nat64], CyclesResultIDL)
    async sendHalfCycles(amount: bigint): Promise<CyclesResult> {
        const result = await call(this.cyclesPrincipal, 'receiveHalfCycles', {
            returnIdlType: CyclesResultIDL,
            cycles: amount
        });
        return { ...result, cyclesRefunded: msgCyclesRefunded() };
    }

    @update([IDL.Nat64], CyclesResultIDL)
    async sendNoCycles(amount: bigint): Promise<CyclesResult> {
        const result = await call(this.cyclesPrincipal, 'receiveNoCycles', {
            returnIdlType: CyclesResultIDL,
            cycles: amount
        });
        return { ...result, cyclesRefunded: msgCyclesRefunded() };
    }
}

function getCyclesPrincipal(): string {
    if (process.env.CYCLES_PRINCIPAL !== undefined) {
        return process.env.CYCLES_PRINCIPAL;
    }
    throw new Error('process.env.CYCLES_PRINCIPAL is undefined');
}
