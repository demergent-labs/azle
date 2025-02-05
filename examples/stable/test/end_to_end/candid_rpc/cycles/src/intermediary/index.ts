import { call, canisterCycleBalance, IDL, query, update } from 'azle';

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

    @update
    async sendCyclesNotify(): Promise<void> {
        return await call<undefined, void>(
            this.cyclesPrincipal,
            'receiveCycles',
            {
                cycles: 1_000_000n,
                oneway: true
            }
        );
    }

    @query([], IDL.Nat64)
    getCanisterCycleBalance(): bigint {
        return canisterCycleBalance();
    }
}

function getCyclesPrincipal(): string {
    if (process.env.CYCLES_PRINCIPAL !== undefined) {
        return process.env.CYCLES_PRINCIPAL;
    }
    throw new Error('process.env.CYCLES_PRINCIPAL is undefined');
}
