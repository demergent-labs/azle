import { call, IDL, msgCyclesRefunded, update } from 'azle';

import { CyclesResult } from '../types';

export default class {
    cyclesPrincipal = getCyclesPrincipal();

    @update([IDL.Nat64], CyclesResult)
    async sendAllCycles(amount: bigint): Promise<CyclesResult> {
        const result = await call(this.cyclesPrincipal, 'receiveAllCycles', {
            returnIdlType: CyclesResult,
            cycles: amount
        });
        return { ...result, cyclesRefunded: msgCyclesRefunded() };
    }

    @update([IDL.Nat64, IDL.Nat64], CyclesResult)
    async sendVariableCycles(
        amountToSend: bigint,
        amountToAccept: bigint
    ): Promise<CyclesResult> {
        const result = await call(
            this.cyclesPrincipal,
            'receiveVariableCycles',
            {
                returnIdlType: CyclesResult,
                cycles: amountToSend,
                paramIdlTypes: [IDL.Nat64],
                args: [amountToAccept]
            }
        );
        return { ...result, cyclesRefunded: msgCyclesRefunded() };
    }

    @update([IDL.Nat64], CyclesResult)
    async sendNoCycles(amount: bigint): Promise<CyclesResult> {
        const result = await call(this.cyclesPrincipal, 'receiveNoCycles', {
            returnIdlType: CyclesResult,
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
