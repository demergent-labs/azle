import { call, canisterBalance, IDL, notify, query, trap, update } from 'azle';

export default class {
    // Reports the number of cycles returned from the Cycles canister
    @update([], IDL.Nat64)
    async sendCycles(): Promise<bigint> {
        return await call(getCyclesPrincipal(), 'receiveCycles', {
            returnIdl: IDL.Nat64,
            payment: 1_000_000n
        });
    }

    @update([])
    sendCyclesNotify(): void {
        return notify(getCyclesPrincipal(), 'receiveCycles', {
            payment: 1_000_000n
        });
    }

    @query([], IDL.Nat64)
    getCanisterBalance(): bigint {
        return canisterBalance();
    }
}

function getCyclesPrincipal(): string {
    return (
        process.env.CYCLES_PRINCIPAL ??
        trap('process.env.CYCLES_PRINCIPAL is undefined')
    );
}
