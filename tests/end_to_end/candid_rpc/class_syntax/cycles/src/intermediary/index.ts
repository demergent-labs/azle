import {
    call,
    canisterBalance,
    canisterBalance128,
    IDL,
    msgCyclesRefunded128,
    notify,
    query,
    trap,
    update
} from 'azle';

export default class {
    // Reports the number of cycles returned from the Cycles canister
    @update([], IDL.Nat64)
    async sendCycles() {
        return await call(getCyclesPrincipal(), 'receiveCycles', {
            returnIdl: IDL.Nat64,
            payment: 1_000_000n
        });
    }

    @update([])
    sendCyclesNotify() {
        return notify(getCyclesPrincipal(), 'receiveCycles', {
            payment: 1_000_000n
        });
    }

    // Reports the number of cycles returned from the Cycles canister
    @update([], IDL.Nat)
    async sendCycles128() {
        await call(getCyclesPrincipal(), 'receiveCycles128', {
            payment: 1_000_000n
        });

        return msgCyclesRefunded128();
    }

    @update([])
    sendCycles128Notify() {
        return notify(getCyclesPrincipal(), 'receiveCycles128', {
            payment: 1_000_000n
        });
    }

    @query([], IDL.Nat64)
    getCanisterBalance() {
        return canisterBalance();
    }

    @query([], IDL.Nat)
    getCanisterBalance128() {
        return canisterBalance128();
    }
}

function getCyclesPrincipal(): string {
    return (
        process.env.CYCLES_PRINCIPAL ??
        trap('process.env.CYCLES_PRINCIPAL is undefined')
    );
}
