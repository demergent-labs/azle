import { call, IDL, init, query, update } from 'azle';

import Cycles from '../cycles';

let cyclesCanister: typeof Cycles;

export default class {
    @init([])
    init() {
        cyclesCanister = Cycles(Principal.fromText(getCyclesPrincipal()));
    }
    // Reports the number of cycles returned from the Cycles canister
    @update([], IDL.Nat64)
    async sendCycles() {
        return await call(cyclesCanister.receiveCycles, {
            cycles: 1_000_000n
        });
    }
    @update([])
    sendCyclesNotify() {
        return ic.notify(cyclesCanister.receiveCycles, {
            cycles: 1_000_000n
        });
    }
    // Reports the number of cycles returned from the Cycles canister
    @update([], IDL.Nat)
    async sendCycles128() {
        await call(cyclesCanister.receiveCycles128, {
            cycles128: 1_000_000n
        });

        return ic.msgCyclesRefunded128();
    }
    @update([])
    sendCycles128Notify() {
        return ic.notify(cyclesCanister.receiveCycles128, {
            cycles: 1_000_000n
        });
    }
    @query([], IDL.Nat64)
    getCanisterBalance() {
        return ic.canisterBalance();
    }
    @query([], IDL.Nat)
    getCanisterBalance128() {
        return ic.canisterBalance128();
    }
}

function getCyclesPrincipal(): string {
    return (
        process.env.CYCLES_PRINCIPAL ??
        ic.trap('process.env.CYCLES_PRINCIPAL is undefined')
    );
}
