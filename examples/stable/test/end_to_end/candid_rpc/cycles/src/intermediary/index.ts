import { call, canisterCycleBalance, IDL, query, update } from 'azle';

export default class {
    // Reports the number of cycles returned from the Cycles canister
    @update([], IDL.Nat)
    async sendCycles(): Promise<bigint> {
        return await call<undefined, bigint>(
            getCyclesPrincipal(),
            'receiveCycles',
            {
                returnIdlType: IDL.Nat,
                cycles: 1_000_000n
            }
        );
    }

    @update
    async sendCyclesNotify(): Promise<void> {
        return await call<undefined, void>(
            getCyclesPrincipal(),
            'receiveCycles',
            {
                cycles: 1_000_000n,
                oneway: true
            }
        );
    }

    @query([], IDL.Nat)
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
