import { call, canisterBalance, IDL, notify, query, update } from 'azle';

export default class {
    cyclesPrincipal = getCyclesPrincipal();

    // Reports the number of cycles returned from the Cycles canister
    @update([], IDL.Nat64)
    async sendCycles(): Promise<bigint> {
        return await call(this.cyclesPrincipal, 'receiveCycles', {
            returnIdlType: IDL.Nat64,
            cycles: 1_000_000n
        });
    }

    @update([])
    sendCyclesNotify(): void {
        return notify(this.cyclesPrincipal, 'receiveCycles', {
            cycles: 1_000_000n
        });
    }

    @query([], IDL.Nat64)
    getCanisterBalance(): bigint {
        return canisterBalance();
    }
}

function getCyclesPrincipal(): string {
    if (process.env.CYCLES_PRINCIPAL !== undefined) {
        return process.env.CYCLES_PRINCIPAL;
    }
    throw new Error('process.env.CYCLES_PRINCIPAL is undefined');
}
